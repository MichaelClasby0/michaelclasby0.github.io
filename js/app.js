const PDFStart = (nameRoute) => {
  let loadingTask = pdfjsLib.getDocument(nameRoute),
    pdfDoc = null,
    canvas = document.querySelector("#cnv"),
    ctx = canvas.getContext("2d"),
    scale = 1.0,
    numPage = 1;

  const GeneratePDF = (numPage) => {
    pdfDoc.getPage(numPage).then((page) => {
      canvas.width = document.querySelector("#pdf").clientWidth;

      let unscaledview = page.getViewport({ scale: scale });
      let currwidth = unscaledview.width;

      let viewport = page.getViewport({ scale: canvas.width / currwidth });
      canvas.height = viewport.height;

      let renderContext = {
        canvasContext: ctx,
        viewport: viewport,
      };

      page.render(renderContext);
    });
  };

  loadingTask.promise.then((pdfDoc_) => {
    pdfDoc = pdfDoc_;
    GeneratePDF(numPage);
  });
};

const startPdf = () => {
  PDFStart("../assets/CV.pdf");
};

var resizeId;
window.addEventListener("load", startPdf);

// Prevents canvas being drawn multiple times while resizing
var lastWidth = window.innerWidth;
window.addEventListener("resize", () => {
  if (window.innerWidth !== lastWidth) {
    lastWidth = window.innerWidth;
    clearTimeout(resizeId);
    resizeId = setTimeout(startPdf, 300);
  }
});

var lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  if (window.innerWidth <= 400) {
    const nav = document.getElementById("nav-container");

    if ((nav.getBoundingClientRect().top = 10)) {
      if (window.scrollY <= lastScrollY) {
        nav.style.position = "sticky";
      } else {
        nav.style.position = "static";
      }
    }
    lastScrollY = window.scrollY;
  }
});
