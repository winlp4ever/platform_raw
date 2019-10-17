import $ from 'jquery'; 

export default async function updatePosts() {
    try {     
        const response = await fetch('/save-post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'another example', content: 'try hard' })
        });

        let data = await response.json();
        return data;
    } catch(err) {
        console.error(`Error: ${err}`);
    }
};