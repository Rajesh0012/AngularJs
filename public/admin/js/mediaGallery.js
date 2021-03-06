$(function() {
    
        function viewBox(a, b) {
            var $image = $('.media-item').find('img');
            if (a == 'image') {
                var preloader = new Image();
                preloader.src = b;
                preloader.onload = function() {
                    var $preloader;
                    var imageHeight;
                    var imageWidth;
                    var maxImageHeight;
                    var maxImageWidth;
                    var windowHeight;
                    var windowWidth;
    
                    $image.width(preloader.width);
                    $preloader = $(preloader);
                    $image.width(preloader.width);
                    $image.height(preloader.height);
                    windowWidth = $(window).width();
                    windowHeight = $(window).height();
                    maxImageWidth = parseInt(windowWidth - 30);
                    maxImageHeight = parseInt(windowHeight - 30);
    
                    if ((preloader.width > maxImageWidth) || (preloader.height > maxImageHeight)) {
                        if ((preloader.width / maxImageWidth) > (preloader.height / maxImageHeight)) {
                            imageWidth = maxImageWidth;
                            imageHeight = parseInt(preloader.height / (preloader.width / imageWidth), 10);
                            $image.width(imageWidth);
                            $image.height(imageHeight);
                        } else {
                            imageHeight = maxImageHeight;
                            imageWidth = parseInt(preloader.width / (preloader.height / imageHeight), 10);
                            $image.width(imageWidth);
                            $image.height(imageHeight);
                        }
    
                    }
                }
                $('.media-item').find('img').show().attr('src', b);
                $('.media-item').find('video').hide();
                $('.screen-loader').fadeOut();
            } else {
                $('.media-item').find('img').hide();
                $('.media-item').find('video').show().attr('src', b);
                $('.screen-loader').fadeOut();
            }
        }
        $.fn.mediaGallery = function() {
            var itemArr = [];
            var indexThumb = '';
            var itemSize = '';
            var _parentEle = '';
            var _mediaWidth, _mediaHeight;
            $('.media-overlay').remove();
            $('body').prepend('<div class="media-overlay"><div class="screen-loader"></div><div class="media-popup-inner"><a href="javascript:void(0);" class="prevG">&#9664;</a><a href="javascript:void(0);" class="nextG">&#9654;</a><a class="close-modal"href="javascript:void(0);"><img src="images/close.svg"class="svg"></a><div class="media-info-ico"><span class="overlay-loading-txt">Loading...</span></div><div class="media-holder"><div class="media-item"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="><video autoplay controls="true"></video></div></div></div></div>');
            $('body').on('click', '.media-holder', function(e) {
                e.stopPropagation();
            });
            //check media size 
            //check ele exist or not    
            if ($(this).hasClass('galleryEntry')) {
                $(this).prepend('<li class="addMedia"><div class="gallery-upload-inner"><i class="fa fa-plus"></i></div></li>');
            }
            if ($(this).find('li').length > 0) {
                var _ele = $(this).find('.item');
                $(_ele).each(function() {
                    $(this).css({
                        'cursor': 'pointer',
                        'position': 'relative'
                    });
                    if ($(this).attr('data-type') == 'video') {
                        $(this).addClass('videoitem');
                    }
                });
                //click on thumb
                $(_ele).click(function() {
                    if ($(this).hasClass('editable')) {
                        //return false;
                    } else {
                        itemArr = [];
                        indexThumb = '';
                        itemSize = '';
                        _parentEle = '';
                        _parentEle = $(this).parent();
                        indexThumb = $(_parentEle).find('.item').index($(this));
                        itemSize = $(_parentEle).find('.item').size();
                        if (indexThumb == parseInt(itemSize - 1)) {
                            $('.nextG').hide();
                            $('.prevG').show();
                            if (itemSize == 1) {
                                $('.nextG').hide();
                                $('.prevG').hide();
                            }
                        } else if (indexThumb == 0) {
                            $('.prevG').hide();
                            $('.nextG').show();
                        } else {
                            $('.prevG').show();
                            $('.nextG').show();
                        }
    
                        $(_parentEle).find('.item').each(function() {
                            var xz = {
                                'src': $(this).attr('data-src'),
                                'type': $(this).attr('data-type')
                            }
                            itemArr.push(xz);
                        });
                        $('body').addClass('popOn');
                        $('.screen-loader').fadeIn();
                        $('.media-overlay').fadeIn(500);
                        var _eleSrc = $(this).attr('data-src');
                        var _eleType = $(this).attr('data-type');
                        viewBox(_eleType, _eleSrc);
                    }
    
                });
                $('body').on('click', '.nextG', function(e) {
                    e.stopPropagation();
                    if (parseInt(itemSize - 1) > indexThumb) {
                        indexThumb = parseInt(indexThumb + 1);
                        parseInt(itemSize - 1) == indexThumb ? $(this).hide() : $(this).show();
                        $('.prevG').show();
                        viewBox(itemArr[indexThumb].type, itemArr[indexThumb].src);
    
                    } else {
                        $(this).hide();
                    }
    
                });
                $('body').on('click', '.prevG', function(e) {
                    e.stopPropagation();
                    if (indexThumb > 0) {
                        indexThumb = parseInt(indexThumb - 1);
                        indexThumb == 0 ? $(this).hide() : $(this).show();
                        $('.nextG').show();
                        viewBox(itemArr[indexThumb].type, itemArr[indexThumb].src);
    
                    } else {
                        $(this).hide();
                    }
    
                });
                $('body').on('keyup', function(e) {
                    if ($(this).hasClass('popOn') && e.keyCode == 37) {
                        if (indexThumb > 0) {
                            indexThumb = parseInt(indexThumb - 1);
                            indexThumb == 0 ? $('.prevG').hide() : $('.prevG').show();
                            $('.nextG').show();
                            viewBox(itemArr[indexThumb].type, itemArr[indexThumb].src);
    
                        } else {
                            $('.prevG').hide();
                        }
                    } else if ($(this).hasClass('popOn') && e.keyCode == 39) {
                        e.stopPropagation();
                        if (parseInt(itemSize - 1) > indexThumb) {
                            indexThumb = parseInt(indexThumb + 1);
                            parseInt(itemSize - 1) == indexThumb ? $('.nextG').hide() : $('.nextG').show();
                            $('.prevG').show();
                            viewBox(itemArr[indexThumb].type, itemArr[indexThumb].src);
    
                        } else {
                            $('.nextG').hide();
                        }
    
                    }
                });
                $('.close-modal').click(function() {
                    $('body').removeClass('popOn');
                    $('.media-overlay').fadeOut(500);
                });
                $('body').on('click', '.media-overlay', function() {
                    $('body').removeClass('popOn');
                    $('.media-overlay').fadeOut(500);
                });
                //append remove button
                /*
                Description: Addition implementation in gallery remove if not required
                 */
                $('.gallery-wrap.gllery.galleryEntry .item').append('<div class="mediaThumb"><a href="javscript:void(0);" class="removeMediaG uploaded"><i class="fa fa-times-circle" aria-hidden="true"></i></a></div>');
            }
    
            /*
            Script to show images on lightbox for owl carousel
            Description: Additional code from line: 190 to 293 if not required
            */
            if ($(this).hasClass('owl-carousel')) {
                var _ele = $(this).find('.item');
                $(_ele).each(function() {
                    $(this).css({
                        'cursor': 'pointer',
                        'position': 'relative'
                    });
    
                });
                //owl thumb click
                $(_ele).click(function() {
                    itemArr = [];
                    indexThumb = '';
                    itemSize = '';
                    _parentEle = '';
                    _parentEle = $(this).parents('.owl-carousel');
                    indexThumb = $(_parentEle).find('.item').index($(this)); //current ele index
                    itemSize = $(_parentEle).find('.item').size(); //total size
                    if (indexThumb == parseInt(itemSize - 1)) {
                        $('.nextG').hide();
                        $('.prevG').show();
                        if (itemSize == 1) {
                            $('.nextG').hide();
                            $('.prevG').hide();
                        }
                    } else if (indexThumb == 0) {
                        $('.prevG').hide();
                        $('.nextG').show();
                    } else {
                        $('.prevG').show();
                        $('.nextG').show();
                    }
                    $(_ele).each(function() {
                        var xz = {
                            'src': $(this).find('img').attr('src'),
                            'type': 'image'
                        }
                        itemArr.push(xz); // colloect all records
                    });
                    $('body').addClass('popOn');
                    $('.screen-loader').fadeIn();
                    $('.media-overlay').fadeIn(500);
                    var _eleSrc = $(this).find('img').attr('src');
                    var _eleType = 'image';
                    console.log(_eleSrc);
                    viewBox(_eleType, _eleSrc); //call view box
                });
                //on next button click
                $('body').on('click', '.nextG', function(e) {
                    e.stopPropagation();
                    if (parseInt(itemSize - 1) > indexThumb) {
                        indexThumb = parseInt(indexThumb + 1);
                        parseInt(itemSize - 1) == indexThumb ? $(this).hide() : $(this).show();
                        $('.prevG').show();
                        viewBox(itemArr[indexThumb].type, itemArr[indexThumb].src);
                    } else {
                        $(this).hide();
                    }
                });
                //on prev button click
                $('body').on('click', '.prevG', function(e) {
                    e.stopPropagation();
                    if (indexThumb > 0) {
                        indexThumb = parseInt(indexThumb - 1);
                        indexThumb == 0 ? $(this).hide() : $(this).show();
                        $('.nextG').show();
                        viewBox(itemArr[indexThumb].type, itemArr[indexThumb].src);
                    } else {
                        $(this).hide();
                    }
                });
                //on keyup left && right
                $('body').on('keyup', function(e) {
                    if ($(this).hasClass('popOn') && e.keyCode == 37) {
                        if (indexThumb > 0) {
                            indexThumb = parseInt(indexThumb - 1);
                            indexThumb == 0 ? $('.prevG').hide() : $('.prevG').show();
                            $('.nextG').show();
                            viewBox(itemArr[indexThumb].type, itemArr[indexThumb].src);
    
                        } else {
                            $('.prevG').hide();
                        }
                    } else if ($(this).hasClass('popOn') && e.keyCode == 39) {
                        e.stopPropagation();
                        if (parseInt(itemSize - 1) > indexThumb) {
                            indexThumb = parseInt(indexThumb + 1);
                            parseInt(itemSize - 1) == indexThumb ? $('.nextG').hide() : $('.nextG').show();
                            $('.prevG').show();
                            viewBox(itemArr[indexThumb].type, itemArr[indexThumb].src);
                        } else {
                            $('.nextG').hide();
                        }
                    }
                });
                ///reset modal
                $('.close-modal').click(function() {
                    $('body').removeClass('popOn');
                    $('.media-overlay').fadeOut(500);
                });
                $('body').on('click', '.media-overlay', function() {
                    $('body').removeClass('popOn');
                    $('.media-overlay').fadeOut(500);
                });
            }
        }
    });