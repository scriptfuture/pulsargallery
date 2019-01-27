/**
 * Pulsar Gallery v0.1
 * site: Fx-future.ru
 * license: MIT License http://www.opensource.org/licenses/mit-license.php
 */
var PulsarGallery = function () {

    var GThat = this;

    this.close = function () {
        closeButton.hide();
        informText.hide();
        titleText.hide();
        pgImage.hide();
        vectors.hide();
        filmstrip.hide();

        // ставим статус выключения галереи
        vectors.setStatus(false);
    } // end fun

    var closeButton = new PGObject_CloseButton(this.close); // кнопка закрыть
    var informText = new PGObject_InformText(); // текст-аннотация слева, сверху
    var titleText = new PGObject_TitleText(); // заголовок изображения
    var pgImage = new PGObject_Image(this.close); // фоновое затемнение
    var vectors = new PGObject_Vectors(); // кнопки назад/вперёд
    var filmstrip = new PGObject_Filmstrip(vectors); // диафильм

    this.alias = 'pulsargallery';
    this.aliaslite = 'pulsarlite';
    this.name = "list1";
    this.action = true; // общие включение галереи до вызова Init
    this.interval = 5; // инетервал в секундах

    this.resize = function () {

        if (this.action) {

            vectors.resize();
            pgImage.resize(closeButton, informText, titleText, this.href);
            filmstrip.resize();

        } // end if

    } // end fun 

    this.actionGal = function (title, imageSrc, fsInfo, infoType, isFilmStrip) {

        // разрешаем слайд-шоу при клике на изображение
        vectors.setClickImage(true);

        // чистим диафильм
        if(isFilmStrip) filmstrip.clean();

        // устанавливаем изображение 
        pgImage.setPosition(imageSrc, fsInfo.count, fsInfo.allcount, closeButton, informText, titleText, title, infoType);

        // устанавливаем кнопки назад/вперёд
        vectors.setPosition();

        // ставим статус включения галереи
        vectors.setObject(fsInfo, closeButton, informText, titleText, pgImage, infoType);

        // обработчики событий кнопок  назад/вперёд
        vectors.left(fsInfo, closeButton, informText, titleText, pgImage);
        vectors.right(fsInfo, closeButton, informText, titleText, pgImage);

        // диафильм
        if(isFilmStrip) filmstrip.setPosition(fsInfo, pgImage, closeButton, informText, titleText);

    } // end fun

/*
    this.actionGalLite = function (title, imageSrc, fsInfo, infoType) {

        // разрешаем слайд-шоу при клике на изображение
        vectors.setClickImage(true);

        // устанавливаем изображение 
        pgImage.setPosition(imageSrc, fsInfo.count, fsInfo.allcount, closeButton, informText, titleText, title, infoType);

        // устанавливаем кнопки назад/вперёд
        vectors.setPosition();

        // обработчики событий кнопок  назад/вперёд
        vectors.left(fsInfo, closeButton, informText, titleText, pgImage);
        vectors.right(fsInfo, closeButton, informText, titleText, pgImage);

    } // end fun
	*/


    this.init = function () {

        var that = this;

        if (this.action) {
      
            // устанавливаем интервал
            vectors.interval = this.interval;

            var regx = new RegExp('^' + this.alias + '\\[([a-zA-Z0-9]+)\\]|' + this.name + '$'),
                rx;
            var regxLite = new RegExp('^' + this.aliaslite + '\\[([a-zA-Z0-9]+)\\]|' + this.name + '$'),
                rxl;

            $("a").each(function () {

                if (this.rel && (rx = this.rel.match(regx))) {

                    $(this).attr('data-group', rx[1]);

                    this.onclick = function (event) {
                        event.stopPropagation ? event.stopPropagation() : (event.cancelBubble=true);
						
						// состояние блока миниатюр вкл./выкл.
						var infoType = true;
						
                        var group = $(this).attr('data-group');
						var fsInfo = filmstrip.getInfo(imageSrc, this.alias, groupName, infoType); // информация по списку изображений

                        GThat.actionGal(this.title, this.href, fsInfo, infoType, true);

                        return false;
                    }


                } else if (this.rel && (rxl = this.rel.match(regxLite))) {

                    $(this).attr('data-group', rxl[1]);

                    this.onclick = function (event) {
                        event.stopPropagation ? event.stopPropagation() : (event.cancelBubble=true);
						
						// состояние блока миниатюр вкл./выкл.
						var infoType = false;

                        var group = $(this).attr('data-group');
						var fsInfo = filmstrip.getInfo(imageSrc, this.alias, groupName, infoType); // информация по списку изображений

                        GThat.actionGal(this.title, this.href, fsInfo, infoType, false);

                        return false;
                    }

                } // end if

            });

            $("a[rel='" + this.alias + "']").on('click', function (event) {
                event.stopPropagation ? event.stopPropagation() : (event.cancelBubble=true);

                var title = this.title;
                var imageSrc = this.href;

                // запрещаем слайд-шоу при клике на изображение
                vectors.setClickImage(false);


                // устанавливаем изображение 
                pgImage.setPosition(imageSrc, 0, 0, closeButton, informText, titleText, title);

                return false;
            });

            $(window).resize(function () {
                GThat.resize();
            });

        } // end if

    } // end fun
	
	this.toFormatFilmStrip = function(index, images, infoType) {
		return ({ "arr": images, "count": index, "allcount": images.length, "infoType": infoType });	
	}
	
	
    this.open = function (index, infoType, isFilmStrip, images) {

        var that = this;

        if (this.action) {
			
			var fsInfo = this.toFormatFilmStrip(index, images, infoType);

            GThat.actionGal(images[index].title, images[index].image, fsInfo, infoType, isFilmStrip);

           // GThat.pgImage.setList(images, pgImage, closeButton, informText, titleText)

            /*
            $("a[rel='" + this.alias + "']").on('click', function (event) {
                event.stopPropagation ? event.stopPropagation() : (event.cancelBubble=true);

                var title = this.title;
                var imageSrc = this.href;

                // запрещаем слайд-шоу при клике на изображение
                vectors.setClickImage(false);


                // устанавливаем изображение 
                pgImage.setPosition(imageSrc, 0, 0, closeButton, informText, titleText, title);

                return false;
            });

            $(window).resize(function () {
                GThat.resize();
            });
			*/
	    } // end if


    } // end fun


};
var pulsargallery = new PulsarGallery();