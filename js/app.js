
const PDFStart = nameRoute => {           
    let loadingTask = pdfjsLib.getDocument(nameRoute),
        pdfDoc = null,
        canvas = document.querySelector('#cnv'),
        ctx = canvas.getContext('2d'),
        scale = 0.5,
        numPage = 1;

        const GeneratePDF = numPage => {

            pdfDoc.getPage(numPage).then(page => {
                
                canvas.width = document.querySelector('#pdf').clientWidth;

                let unscaledview = page.getViewport({ scale: 1.0 });
                let currwidth = unscaledview.width;

                let viewport = page.getViewport({ scale: canvas.width/currwidth });
                    canvas.height = viewport.height;
                    // canvas.width = viewport.width;

            
                let renderContext = {
                    canvasContext : ctx,
                    viewport:  viewport
                }

                page.render(renderContext);
            })

        }

        
        loadingTask.promise.then(pdfDoc_ => {
            pdfDoc = pdfDoc_;
            GeneratePDF(numPage)
        });
}

const startPdf = () => {
    PDFStart('../assets/CV.pdf')
}


var resizeId;
window.addEventListener('load', startPdf);

// Prevents canvas being drawn multiple times while resizing 
window.addEventListener('resize', () => {
    console.log("resized");

    clearTimeout(resizeId);
    resizeId = setTimeout(startPdf, 500);

});


