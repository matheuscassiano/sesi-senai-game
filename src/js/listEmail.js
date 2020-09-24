const emails = JSON.parse(localStorage.getItem('emails')) || [];
const table = document.querySelector('table');
const downloadBtn = document.querySelector('button');

emails.forEach(item => {
    const line = document.createElement('tr');
    const itemEmail = document.createElement('td');
    const itemDate = document.createElement('td');
    // const itemDate = document.createElement('');

    itemEmail.innerHTML = item.email;
    itemDate.innerHTML = item.date;

    line.appendChild(itemEmail);
    line.appendChild(itemDate);
    table.appendChild(line);
});

downloadBtn.addEventListener('click', () => {
    // const body = document.querySelector('body');
    // window.document.write(`<link rel=\"stylesheet\" href=\"./src/css/emailList.css\" type=\"text/css\" media=\"print\"/>`);
    setTimeout(() => {
        window.print()
    });
})