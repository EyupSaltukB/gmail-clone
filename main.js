import { ele, renderMails, toggleModal } from "./scripts/ui.js";
import { getDate } from "./scripts/helpers.js";

// import {mailData} from "./scripts/contants.js" (kaldırıldı)
// elemanların gelip gelmediğinin kontrolü console.log(ele)

// localStorage'dan verileri al ve obje formatına çevir
// projede mail verisi olarak hep bunu kullanacağız
// güncellendiğinde localStorage'da güncelle
const strMails = localStorage.getItem("mails") || [];
let mailData = JSON.parse(strMails);

/*
 * açılır kapanır navbar
 * menu iconuna tıklanma olayını izleme
 * tıklanınca nav menüsüne hide classı ekle, tıklıyken hide classını kaldır.
 */

ele.menu.addEventListener("click", () => {
  ele.nav.classList.toggle("hide");
});

/* listeleme  
kullanıcı projeye girdiğinde mailler listelenecek
*/
document.addEventListener("DOMContentLoaded", () => {
  renderMails(mailData);
  /* ekran 1200px altında ise navbar kapalı gelsin */
  if (window.innerWidth < 1200) {
    ele.nav.classList.add(".hide");
  }
});

/* modal açma/kapama özelliği */
// oluştur butonuna tıklanınca modalı göster (d:grid)
// X veya dışına tıklanınca modal kapat (d:none)
ele.createBtn.addEventListener("click", () => toggleModal(true));
ele.closeBtn.addEventListener("click", () => toggleModal(false));

ele.modal.addEventListener("click", (e) => {
  // tıklanılan elemanın classında modal-wrapper varsa
  // target > tıklanılan elemandır
  if (e.target.classList.contains("modal-wrapper")) {
    toggleModal(false);
  }
});

/* mail atma özelliği */
/* açılan modaldaki formun gönderilme olayını izleme
eğer bütün inputlar doluysa yeni mail oluştur
değilse uyarı ver */

ele.modalForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // formdaki inputların verilerin erişme
  const receiver = e.target[1].value;
  const title = e.target[2].value;
  const message = e.target[3].value;

  console.log(title, receiver, message);

  // inputlar boş ise uyarı gönder
  if (!receiver || !title | !message) {
    alert("Lütfen tüm alanları doldurun!");
  } else {
    // diziye eklemek için mail objesi oluşturma
    const newMail = {
      // her saniye eşsiz bir değer oluşturur
      id: new Date().getTime(),
      sender: "Saltuk",
      receiver: receiver,
      title: title,
      message: message,
      date: getDate(),
    };

    // yeni maili mailler dizisine ekleme
    mailData.unshift(newMail);

    // mailler dizisinin son halini localStorage'a kaydettik
    localStorage.setItem("mails", JSON.stringify(mailData));

    // mailler dizisinin son halini ekrana bastık
    renderMails(mailData);

    // mail atıldıktan sonra modalı oto. kapat
    toggleModal(false);
  }
});

// localestorage hafızası küçük old. için stringe çevirme
// console.log(JSON.stringify(mailData));
// console.log(new Date().getDate())

/* mail silme işlemi */
const handleClick = (e) => {
  // tıklanılan sil butonunun parentına erişme
  const mail = e.target.closest(".mail");
  const mailId = mail.dataset.id;

  console.log(mailId);
  // tıklanılan elemanın id'si delete ise elemanı sil
  if (e.target.id === "delete" && confirm("Bu maili silmek istiyor musunuz?")) {
    // id'si sileceğimiz elemana eşit olmayan elemanları filtrele
    mailData = mailData.filter((mail) => mail.id != Number(mailId));

    // localstorage güncelleme
    localStorage.setItem("mails", JSON.stringify(mailData));

    // maili html'den kaldır )(remove sadece html elemanları için çalışır)
    mail.remove();
  }

  // tıklanılan eleman yıldız ise elemanı like'la
  if (e.target.id === "star") {
    // id'sini bildiğimiz mailin tüm bilgilerini al
    const found = mailData.find((item) => item.id === Number(mailId));
    // mailin "isStared" değerini tersine çevir
    found.isStared = !found.isStared;
    // mailler dizisini güncelle yeni maili eski mailin yerine koy
    // localstorage'u güncelle
    localStorage.setItem('mails', JSON.stringify(mailData));
    // arayüzü güncelle
    renderMails(mailData);
  }
};

ele.mailsArea.addEventListener("click", handleClick);

// 6) Navigasyon Menüsü Aktifliği
ele.nav.addEventListener('click', (e) => {
    // eğerki ikinci categorye yani "yıldızlı" kategorisine tıklanırsa
    if (e.target.id === 'cat2') {
      // dizi içerisnden sadece yıldı olanları al ve ekrana yansıt
      const filtred = mailData.filter((mail) => mail.isStared === true);
      renderMails(filtred);
    } else {
      // bütün diziyi ekrena yansıt
      renderMails(mailData);
    }
  });

/* Aratma Özelliği */
let timer;

ele.searchInput.addEventListener("input", (e) => {
    // yeni tuşlamada önceki geri sayımı sıfırla
    clearTimeout(timer);
    // fonks. çalıştırmak için geri sayım başlat
  timer = setTimeout(() => searchMail(e), 1000);
});

function searchMail(e) {
  // arama terimine erişme
  const query = e.target.value;

  // arama terimi mailin içerisindeki bir değerle eşleşiyorsa
  const filtred = mailData.filter((mail) =>
    // objeyi diziye çevirme
    Object.values(mail)
      .slice(1, 6)
      .some((value) => value.toLowerCase().includes(query))
  );

  if (filtred.length === 0) {
    ele.mailsArea.innerHTML =
      '<div class="warn">Eşleşen mail bulunamadı.</div>';
  } else {
    // filtrelenenleri ekrana bas
    renderMails(filtred);
  }
}