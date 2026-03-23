exports.handler = async function (event) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
    }

    var body;
    try {
        body = JSON.parse(event.body);
    } catch (e) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request' }) };
    }

    var email = body.email;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Ongeldig e-mailadres' }) };
    }

    var phone = body.phone || '';
    if (phone) {
        phone = phone.replace(/[\s\-\(\)]/g, '');
        if (!phone.startsWith('+31')) {
            phone = '+31' + phone.replace(/^0+/, '');
        }
        var digits = phone.replace(/^\+31/, '');
        if (digits.length < 9 || digits.length > 10) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Ongeldig telefoonnummer' }) };
        }
    }

    var apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
        return { statusCode: 500, body: JSON.stringify({ error: 'Server configuratiefout' }) };
    }

    var contactData = {
        email: email,
        listIds: [3],
        updateEnabled: true
    };

    if (phone) {
        contactData.attributes = { SMS: phone };
    }

    try {
        var response = await fetch('https://api.brevo.com/v3/contacts', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                'api-key': apiKey
            },
            body: JSON.stringify(contactData)
        });

        if (response.ok || response.status === 201) {
            return {
                statusCode: 200,
                body: JSON.stringify({ success: true })
            };
        }

        var data = await response.json();

        if (data.code === 'duplicate_parameter') {
            return {
                statusCode: 200,
                body: JSON.stringify({ success: true, duplicate: true })
            };
        }

        return {
            statusCode: response.status,
            body: JSON.stringify({ error: data.message || 'Er ging iets mis' })
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Verbindingsfout. Probeer het later opnieuw.' })
        };
    }
};
