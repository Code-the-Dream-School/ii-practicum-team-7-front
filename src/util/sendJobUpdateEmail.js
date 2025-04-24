export async function sendJobUpdate({jobId, status, senderId, recipientId}) {
    const token = localStorage.getItem('authToken');

    if (!token) {
        console.warn('Cant send email')
    }

    try {
        const response = await fetch('Fake URL', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify({
                jobId,
                status,
                senderId,
                recipientId
            })
        });

        const data = await response.json()
        if (!response.ok) throw new Error(data.message || 'email failed to send')
        
       console.log('email sent')
    } catch (error) {
        console.error('email error', error.message)
    }


}