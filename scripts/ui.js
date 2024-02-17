/* ARAYÜZ İŞLEMLERİ */

/* birden fazla eleman export edileceği için 
obje içine alındı */
export const ele = {
  menu: document.querySelector("#menu"),
  nav: document.querySelector("nav"),
  mailsArea: document.querySelector(".mails"),
  modal: document.querySelector('.modal-wrapper'),
  createBtn : document.querySelector('.create'),
  closeBtn : document.querySelector('.close-modal'),
  modalForm : document.querySelector('.modal'),
  searchInput : document.querySelector("form #search")
};

/* ekrana mailleri yanstıma */
// mailData dizisindeki her mail için html'deki mail alanına bir mail yansıt
export const renderMails = (mailData) => {
    const mail_html = mailData.map((mail) => {
        return `
    <div class="mail" data-id="${mail.id}">
                    <div class="info">
                        <input type="checkbox">
                        <i id="star" class="bi bi-star"></i>
                        <b>${mail.sender}</b>
                    </div>
                    <div class="content">
                        <p class="title">${mail.title}</p>
                        <p class="description">${mail.message}</p>
                    </div>
                    <p class="time">${mail.date}</p>
                    
                    <div id="button-wrapper">
                        <button id="delete" >Sil</button>
                    </div>
                </div>
    `})
    /* join > dizi olarak tanımlanmış olan html değişkenini stringe çevirme 
    çünkü dizi ekrana basılamaz */
    /* mail alanına oluşturduğumuz stringi gönder */
    ele.mailsArea.innerHTML = mail_html.join(" ");
};

/* modalı gizle/göster 
true ise göster false ise gizle */
export const toggleModal = (willOpen) => {
    ele.modal.style.display = willOpen === true ? "grid" : "none";
} 