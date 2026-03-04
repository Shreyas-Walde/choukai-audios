const fs = require('fs');

async function download() {
    const url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzkyZGE5M2M0NGQ1YzQ0ODE4YzRmNTJmZTg3ZGEzZDcwEgsSBxC5iPempAgYAZIBIwoKcHJvamVjdF9pZBIVQhMxMTQwNjMyNDIxMjU2MzUwMDAw&filename=&opi=89354086";
    const response = await fetch(url);
    const text = await response.text();
    fs.writeFileSync('stitch_ui.html', text);
    console.log('Downloaded length:', text.length);
}

download().catch(console.error);
