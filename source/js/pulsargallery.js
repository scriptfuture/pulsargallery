/**
 * Pulsar Gallery v0.1
 * site: Fx-future.ru
 * license: MIT License http://www.opensource.org/licenses/mit-license.php
 */
var PulsarGallery = function () {

    var GThat = this;
	var isOpenGallery = false;

    this.close = function () {
		
		// маркер, что галлерея открыта
		isOpenGallery = false;
		
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
            pgImage.resize(closeButton, informText, titleText, this.href, isOpenGallery);
            filmstrip.resize();

        } // end if

    } // end fun 

    this.actionGal = function (title, imageSrc, fsInfo, infoType, isFilmStrip) {
		
		// маркер, что галлерея открыта
		isOpenGallery = true;
		
        var doc_w = $(window).width();
        var doc_h = $(window).height();

        // разрешаем слайд-шоу при клике на изображение
        vectors.setClickImage(true);

        // чистим диафильм
        if(isFilmStrip) filmstrip.clean();

        // устанавливаем изображение 
        pgImage.setPosition(imageSrc, fsInfo.count, fsInfo.allcount, closeButton, informText, titleText, title, infoType);
		
		// если галлерея открылась в альбомном режиме
		if(doc_w >= doc_h) {

			// устанавливаем кнопки назад/вперёд
			vectors.setPosition();

			// диафильм (если галлерея открылась в альбомном режиме)
			if(isFilmStrip) filmstrip.setPosition(fsInfo, pgImage, closeButton, informText, titleText);
		
		} // end if
		
		// ставим статус включения галереи
		vectors.setObject(fsInfo, closeButton, informText, titleText, pgImage, infoType);

		// обработчики событий кнопок  назад/вперёд (если галлерея открылась в альбомном режиме)
		vectors.left(fsInfo, closeButton, informText, titleText, pgImage);
		vectors.right(fsInfo, closeButton, informText, titleText, pgImage);

    } // end fun


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
						
                        var groupName = $(this).attr('data-group');
						var fsInfo = filmstrip.getInfo(this.href, this.alias, groupName, infoType); // информация по списку изображений
						
						console.log(fsInfo);

                        GThat.actionGal(this.title, this.href, fsInfo, infoType, true);

                        return false;
                    }


                } else if (this.rel && (rxl = this.rel.match(regxLite))) {

                    $(this).attr('data-group', rxl[1]);

                    this.onclick = function (event) {
                        event.stopPropagation ? event.stopPropagation() : (event.cancelBubble=true);
						
						// состояние блока миниатюр вкл./выкл.
						var infoType = false;

                        var groupName = $(this).attr('data-group');
						var fsInfo = filmstrip.getInfo(this.href, this.alias, groupName, infoType); // информация по списку изображений

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
		return ({ "arr": images, "count": index, "allcount": images.length, "infoType": infoType, "object": filmstrip });	
	}
	
	
    this.open = function (index, infoType, isFilmStrip, images) {

        if (this.action) {
			
			var fsInfo = this.toFormatFilmStrip(index, images, infoType);

            GThat.actionGal(images[index].title, images[index].image, fsInfo, infoType, isFilmStrip);

            $(window).resize(function () {
                GThat.resize();
            });
	    } // end if


    } // end fun


};
var pulsargallery = new PulsarGallery();