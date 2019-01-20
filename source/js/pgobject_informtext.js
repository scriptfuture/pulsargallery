/**
 * Pulsar Gallery v0.1
 * site: Fx-future.ru
 * license: MIT License http://www.opensource.org/licenses/mit-license.php  
 */
var PGObject_InformText = function () {

    // текст-аннотация слева, сверху
    var informText = document.createElement('div');
    $(informText).hide();
    informText.appendChild(document.createTextNode('загрузка...'));
    informText.title = "подсчёт изображений загруженных на страницу";
    
    // иконки управления слайд-шоу
    var startIcon = '&#x25BA;', stopIcon = '&#8709;';
    
    // блок управления слайд-шоу
    var slideShowBlock = document.createElement('span');
    $(slideShowBlock).css({
        'border': '1px solid silver', 
        'padding': '2px 5px',
        'margin-left': '20px',
    });
        
    // кнопка старт слайд-шоу
    var slideShowStartButton = document.createElement('span');
    $(slideShowStartButton).css({
        'color': '#dddddd', 
        'cursor': 'pointer'
    });
    $(slideShowStartButton).attr('title', 'Запуск слайд-шоу');
    $(slideShowStartButton).html(startIcon);
        
    // добавлем кнопку старта в блок упрпавления слайд-шоу
    slideShowBlock.appendChild(slideShowStartButton);
    

    var apdstatus = false; // статус добавления на сцену
    
    this.setStartIcon = function() {
        $(slideShowStartButton).attr('title', 'Запуск слайд-шоу');
        $(slideShowStartButton).html(startIcon);
    };
    
    this.setStopIcon = function() {
        $(slideShowStartButton).attr('title', 'Остановить слайд-шоу');
        $(slideShowStartButton).html(stopIcon);
    };
    
    this.getLinkStartButton = function() {
        return slideShowStartButton;
    };

    this.setPosition = function (imageLeft, imageWidth, imageSrc, realWidth, realHeight, nowCount, allCount) {

        var doc_w = $(window).width();

        // текст - кол-во изображений и ссылка
        $(informText).css({
            'position': 'fixed',
            'z-index': '30',
            'color': '#dddddd',
            'font-family': 'Arial, Geneva, Helvetica, sans-serif',
            'font-size': '14px',
            'font-weight': '100',
            'left': (doc_w / 2 - 50) + 'px',
            'top': '26px',
            'width': '500px',
            'text-align': 'left',
            'display': 'block'
        });
        

        
        var fullSizeText = '<a href="' + imageSrc + '" target="_blank" style="color:#dddddd;" title="Откроется в новом окне">полный размер</a>';
        
        var iTextLeft = imageLeft + 10;
        $(informText).css('left', iTextLeft + 'px');

        if (imageWidth < 480 && imageWidth > 360) $(informText).css('font-size', '11px');
        else if (imageWidth <= 360 && imageWidth > 330) $(informText).css('font-size', '10px');
        else if (imageWidth <= 330) $(informText).css('font-size', '9px');

        var imgParams = 'изображение ' + (nowCount + 1) + ' из ' + allCount +
            ' &nbsp;—&nbsp; ' + realWidth + '&times;' + realHeight;
            
        if(nowCount == 0 && allCount == 0) {
            
            imgParams = realWidth + '&times;' + realHeight;
            $(informText).html(imgParams + ' ' + fullSizeText + ' ');  
        
        } else {
            
            $(informText).html(imgParams + ' ' + fullSizeText + ' '); 
            $(informText).append(slideShowBlock);      
            
        } // end if
        
        $(informText).show();

        // добавлено ли на сцену
        if (!apdstatus) $("body").append(informText);
        apdstatus = true;

    } // end fun

    this.hide = function () {

        $(informText).hide();

    } // end fun

    this.setInform = function (text) {
        $(informText).html(text);
    } // end fun

} // end fun