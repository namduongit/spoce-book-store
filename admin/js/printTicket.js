export function printTicket(idButton, idContent, title) {
  document.getElementById(idButton).addEventListener("click", () => {
    // Định dạng chuỗi ngày
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const formattedDate = `${day}${month <= 9 ? "0" + month : month}${year}`;

    // In phiếu
    const element = document.getElementById(idContent);
    const options = {
      margin: 5,
      filename: `${formattedDate}_${title}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 }, // Tăng độ phân giải
      jsPDF: { unit: "mm", format: "a3", orientation: "portrait" },
    };
    html2pdf().set(options).from(element).save();
  });
}
