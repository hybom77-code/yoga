export default async function handler(req, res) {
  // Solo permitir peticiones POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido. Solo se acepta POST.' });
  }

  const { prompt } = req.body || {};
  if (!prompt) {
    return res.status(400).json({ error: 'El prompt es requerido.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ 
      error: 'La variable de entorno GEMINI_API_KEY no está configurada en el panel de Vercel.' 
    });
  }

  const payload = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: 'application/json' }
    })
  };

  try {
    let url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    let geminiRes = await fetch(url, payload);
    let data = await geminiRes.json();

    // Respaldo con Gemini 2.0 en caso de saturación
    if (data.error && data.error.message && data.error.message.includes('high demand')) {
      console.warn('Gemini 2.5 saturado. Probando con Gemini 2.0...');
      url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      geminiRes = await fetch(url, payload);
      data = await geminiRes.json();
    }

    if (data.error) {
      return res.status(geminiRes.status || 500).json({ error: data.error.message });
    }

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      const reason = data.candidates && data.candidates[0] ? data.candidates[0].finishReason : 'desconocida';
      return res.status(500).json({ error: `La IA no pudo generar respuesta (${reason}).` });
    }

    let textContent = data.candidates[0].content.parts[0].text;
    const start = textContent.indexOf('{');
    const end = textContent.lastIndexOf('}');
    if (start !== -1 && end !== -1) {
      textContent = textContent.substring(start, end + 1);
    }

    return res.status(200).json({ result: textContent.trim() });
  } catch (err) {
    return res.status(500).json({ error: 'Error al conectar con Gemini: ' + err.message });
  }
}
