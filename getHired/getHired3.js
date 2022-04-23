const pdf=document.querySelector('#pdf');
const file_name_ed=document.querySelector('.file-name')
const link1_ed=document.querySelector('#link1_ed');
const link2_ed=document.querySelector('#link2_ed');

function pdfSelected(){
   
      console.log('Selected file: ' + pdf.files.item(0).name);
      file_name_ed.innerHTML=pdf.files.item(0).name;
      console.log('Selected file: ' + pdf.files.item(0).size);
      console.log('Selected file: ' + pdf.files.item(0).type);
}