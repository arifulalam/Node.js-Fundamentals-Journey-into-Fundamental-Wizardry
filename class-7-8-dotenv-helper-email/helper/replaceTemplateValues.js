function replaceTemplateValues(template, values){
    let html = template;
    for (let key in values) {
        html = html.replace(new RegExp('{{' + key + '}}', 'g'), values[key]);
    }
    return html;
}

module.exports = replaceTemplateValues