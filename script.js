document.getElementById('fetch-button').addEventListener('click', fetchData);

async function fetchData() {
    const response = await fetch('https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY', {method: 'GET', referrerPolicy: 'no-referrer'});
    const data = await response.json();
    const jsonContent = JSON.stringify(data, null, 2);

    // Prepare the commit
    const username = 'your-username';
    const repo = 'your-repo';
    const path = 'data.json';
    const token = 'your-personal-access-token';
    const message = 'Add NIFTY option chain data';
    
    const getSHA = async () => {
        const result = await fetch(`https://api.github.com/repos/${username}/${repo}/contents/${path}`, {
            headers: {
                'Authorization': `token ${token}`
            }
        });
        const json = await result.json();
        return json.sha;
    }

    const sha = await getSHA();

    const commitData = {
        message: message,
        committer: {
            name: 'Your Name',
            email: 'your-email@example.com'
        },
        content: btoa(jsonContent),
        sha: sha
    };

    const commitResponse = await fetch(`https://api.github.com/repos/${username}/${repo}/contents/${path}`, {
        method: 'PUT',
        headers: {
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(commitData)
    });

    if (commitResponse.ok) {
        alert('Data committed successfully!');
    } else {
        alert('Failed to commit data.');
    }
}
