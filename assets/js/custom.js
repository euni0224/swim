$(function () {
    $(window).resize(function () {
        location.reload();
    });

    // Cursor custom
    const cursor = document.querySelector('#cursor'); // cursor
    const cursorCircle = cursor.querySelector('.cur_cir'); // cursor background

    const mouse = { x: 0, y: 0 }; // mouse pointer position
    const pos = { x: 0, y: 0 }; // cursor position
    const speed = 0.3;

    const updateCoordinates = e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }

    window.addEventListener('mousemove', updateCoordinates);

    function getAngle(diffX, diffY) {
        return Math.atan2(diffY, diffX) * 180 / Math.PI;
    }

    function getSqueeze(diffX, diffY) {
        const distance = Math.sqrt(
            Math.pow(diffX, 2) + Math.pow(diffY, 2)
        );
        const maxSqueeze = 0.1;
        const accelerator = 100;
        return Math.min(distance / accelerator, maxSqueeze);
    }


    const updateCursor = () => {
        const diffX = Math.round(mouse.x - pos.x);
        const diffY = Math.round(mouse.y - pos.y);

        pos.x += diffX * speed;
        pos.y += diffY * speed;

        const angle = getAngle(diffX, diffY);
        const squeeze = getSqueeze(diffX, diffY);

        const scale = 'scale(' + (1 + squeeze) + ', ' + (1 - squeeze) + ')';
        const rotate = 'rotate(' + angle + 'deg)';
        const translate = 'translate3d(' + pos.x + 'px ,' + pos.y + 'px, 0)';

        cursor.style.transform = translate;
        cursorCircle.style.transform = rotate + scale;
    };

    function loop() {
        updateCursor();
        requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);


    const cursorModifiers = document.querySelectorAll('[cursor-type]');

    cursorModifiers.forEach(cursorModifier => {
        cursorModifier.addEventListener('mouseenter', function () {
            const className = this.getAttribute('cursor-type');
            cursor.classList.add(className);
        });

        cursorModifier.addEventListener('mouseleave', function () {
            const className = this.getAttribute('cursor-type');
            cursor.classList.remove(className);
        });
    });



    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? true : false;

    jQuery(document).ready(function ($) {
        if (!isMobile) {
            //PC
            $('#cursor').css('opacity', '1');

            if (navigator.maxTouchPoints == 5) {
                $('#cursor').css('opacity', '0');
            }

        } else {
            //MOBILE
            $('#cursor').css('opacity', '0');
        }


    });


    //스크롤 부드럽게

    //상단 메뉴바 상세보기
    $(".gnb .menu-item").hover(function () {
        if ($(this).siblings().hasClass('on')) {
            $(this).siblings().removeClass('on');
            $(this).addClass('on');
        } else {
            $(this).addClass('on');

        }
    }, function () {
        $(".gnb .menu-item").removeClass('on');
    })

    //상단 메뉴바 디테일 상세보기
    $(".gnb .sub-menu-item").hover(function () {
        if ($(this).siblings().hasClass('show')) {
            $(this).siblings().removeClass('show');
            $(this).addClass('show');
        } else {
            $(this).addClass('show');
        }
    }, function () {
        $(".gnb .sub-menu-item").removeClass('show');
    })

    // //gnb 픽스드
    // ScrollTrigger.create({
    //     trigger: '.gnb',
    //     start: 'top top',
    //     endTrigger: 'footer',
    //     end: 'bottom bottom',
    //     pin: true,
    //     pinType: "fixed",
    //     markers: true,
    //     pinReparent: true,
    //     pinSpacing: false
    //   });


    //햄버거 서브 메뉴 
    $(".btn-ham").click(function (e) {
        e.preventDefault();
        $('body').toggleClass('hid');
        $('.sub-lnb').toggleClass('show-sub-menu');
        $(this).toggleClass('eff');
        $('.sub-lnb .menu-name').removeClass('act');
        $('.sub-lnb .sub-menu-list').removeClass('act');
        $('.sub-lnb .menu-name.one').addClass('act');
        $('.sub-lnb .sub-menu-list.one').addClass('act');
        if ($(window).width() < 768) {
            $(".sub-lnb .sub-menu-list").removeClass("act");
            $(".sub-lnb .sub-menu-list").removeClass("csseff");
            $(".sub-lnb .menu-name").addClass("act");
        } else {
            $(".sub-lnb .sub-menu-list").addClass("csseff");
        }
    })
    //햄버거 서브메뉴 클릭시 옆에 소메뉴 나오게
    $(".sub-lnb .menu-name").click(function (e) {
        e.preventDefault();
        // const ssd = $(this).parent().siblings().find('.menu-name');

        if ($(window).width() < 768) {
            $(this).next().slideToggle();
        } else {
            if (!$(this).hasClass('act')) {
                $('.sub-lnb .menu-name').removeClass('act');
                $('.sub-lnb .sub-menu-list').removeClass('act');
                $(this).next().addClass('act');
                $(this).addClass('act');
            }
        }
    })
    $(".sub-lnb .sub-menu-name").click(function(e){
        e.preventDefault();
        if ($(window).width() < 768) {
            $(this).next().slideToggle();
            // $(this).parent().siblings().find('.sub-menu-detail-list').stop().slideUp();;
        }
    })

    //sc-main-slid 스크롤 트리거
    //메인슬라이드 
    var swiper1 = new Swiper(".main-slid01", {
        effect: "fade",
        fadeEffect: {
            crossFade: true,
        },
        speed: 800,
        allowTouchMove: true,
        // parallax: true,
        // loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false
        },
        observer: true,
        observeParents: true,
    });
    swiper1.autoplay.stop();
    let scmp = '.sc-main-slid .head-connection .head-wrap .slogan p';
    let scmsl1 = '.sc-main-slid .head-connection .head-wrap .slogan .sl-slid1';
    let scmsmall = '.sc-main-slid .head-connection .head-wrap .slogan-small';
    let scmsince = '.sc-main-slid .head-connection .head-wrap .since';
    let scmslbo = '.sc-main-slid .head-connection .head-wrap .slogan-bottom';
    gsap.set(scmp, { y: 110 });
    gsap.set(scmsl1, { yPercent: 100 });
    gsap.set(scmsmall, { y: 50 });
    gsap.set(scmsince, { x: 40, opacity: 0 });
    gsap.set(scmslbo, { x: 40, opacity: 0 });

    let intro = gsap.timeline({
        defaults: {
            duration: 0.6,
        }
    });
    intro
        .addLabel('b')
        .addLabel('c')
        .to(scmp, { y: 0, transition: '0.3s' }, 'b')
        .to(scmsl1, { yPercent: 0, duration: 1.3 }, 'b')
        .to(scmsmall, { y: 0, duration: 1.3 }, 'b')
        .to(scmsince, { x: 0, opacity: 1, duration: .8 }, 'c')
        .to(scmslbo, { x: 0, opacity: 1, duration: .8 }, 'c')

    ScrollTrigger.create({
        trigger: '.sc-main-slid',
        pin: true,
        // invalidateOnRefresh: true,
        // pinSpacing: false,
        // markers: true,
        // scrub: 1,
        start: 'top top',
        end: 'bottom top'
    });
    ScrollTrigger.create({
        trigger: '.sc-main-slid .group-slid',
        // pinSpacing: false,
        start: 'top top',
        // scrub: 2,
        onEnter: function () {
            $('.sc-main-slid').addClass('chg');
            // $('.sc-main-slid').addClass('chg2');
            $('.header').addClass('set');

            swiper1.autoplay.start();
        },
        onLeaveBack: function () {
            $('.sc-main-slid').removeClass('chg');
            // $('.sc-main-slid').removeClass('chg2');
            $('.header').removeClass('set');

            swiper1.autoplay.stop();
        }
    });


    //sc-prod 스크롤트리거
    let se02p = '.sc-prod p';
    let se02h2 = '.sc-prod h2';
    let se02obj = '.sc-prod .obj';
    let se02li = '.sc-prod .prod-list li';

    gsap.set(se02p, { opacity: 0, x: -100 });
    gsap.set(se02h2, { opacity: 0, x: -100 });
    gsap.set($(se02obj).eq(0), { opacity: 0, x: -100 });
    gsap.set($(se02obj).eq(1), { opacity: 0, x: -100 });
    gsap.set($(se02obj).eq(2), { opacity: 0, x: 100 });
    gsap.set(se02li, { opacity: 0, y: 40 });

    let se02motion = gsap.timeline();
    se02motion
        .to(se02p, { opacity: 1, x: 0, duration: .8 })
        .to(se02h2, { opacity: 1, x: 0, duration: .8 }, '-=80%')
        .to(se02li, { opacity: 1, y: 0, stagger: .2, duration: .8 }, '-=80%')
        .to(se02obj, { opacity: 1, x: 0, stagger: .2, duration: 1.2 }, '-=80%')

    se02motion.pause();

    ScrollTrigger.create({
        trigger: '.sc-prod',
        start: 'top center+=20%',
        // markers: true,
        scrub: 5,
        onEnter: function () {
            se02motion.play();
        },
        onLeaveBack: function () {
            se02motion.reverse();
        }
    });

    gsap.fromTo('.sc-prod .bg-company-name', { xPercent: -20 }, {
        scrollTrigger: {
            trigger: '.sc-prod',
            start: 'top center',
            end: 'bottom top',
            scrub: 5,
        },
        xPercent: 20
    })

    //sc-prod-view 
    //클릭이벤트
    $(".prod-view-item").click(function () {
        if ($(this).hasClass('show') == 0) {
            $('#cursor').addClass('close');
            $(this).addClass('show');
            $(this).siblings().addClass('show_none');
        } else {
            $('#cursor').removeClass('close');
            $(this).removeClass('show');
            $(this).siblings().removeClass('show_none');
        }
    })
    //커서 벗어날때
    $(".prod-view-item").hover(function () {
        if ($(this).hasClass('show')) {
            $('#cursor').addClass('close');
        }

    })
    $(".prod-item").hover(function () {
        $('#cursor').removeClass('close');

    })
    //스크롤트리거
    let sctb = '.sc-prod-view .prod-view-list .prod-view-item .text-box';

    gsap.set(sctb, { opacity: 0, x: -100 });

    let scpviewmotion = gsap.timeline();
    scpviewmotion
        .to(sctb, { opacity: 1, x: 0, stagger: .2, duration: .8 }, 'A')

    scpviewmotion.pause();

    ScrollTrigger.create({
        trigger: '.sc-prod-view',
        start: 'top center+=20%',
        onEnter: function () {
            scpviewmotion.play();
        },
        onLeaveBack: function () {
            scpviewmotion.reverse();
            $(".prod-view-item").removeClass('show');
            $(".prod-view-item").removeClass('show_none');
        }
    });
    ScrollTrigger.create({
        trigger: '.sc-prod-view',
        start: 'top top',
        end: 'bottom top',
        pin: true,
        // markers: true,
        scrub: 7,
    });

    //sc-intro 스크롤 트리거
    gsap.set('.sc-intro .bgimg-box', { yPercent: -28 });
    gsap.to('.sc-intro .bgimg-box', {
        scrollTrigger: {
            trigger: '.sc-intro',
            // start: 'top top',
            start: 'top center+=10%',
            end: 'bottom top',
            scrub: 1,
            // pin: true,
            // markers: true,
        },
        yPercent: 0
    });
    gsap.to('.sc-intro .txt-effect .title-back', {
        scrollTrigger: {
            trigger: '.sc-intro',
            start: 'top center+=20%',
            end: 'bottom bottom',
            scrub: 1,
            // markers: true,
        },
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        stagger: .2,
    })



    // news 스크롤 

    let newsh2 = '.sc-news .news-top h2';
    let newsmore = '.sc-news .news-top .btn-more';
    let newsswiper = '.sc-news ul.news-list';

    gsap.set(newsh2, { opacity: 0, y: 40 });
    gsap.set(newsmore, { opacity: 0, y: 40 });
    gsap.set(newsswiper, { opacity: 0, y: 40 });

    let newsmotion = gsap.timeline();
    newsmotion
        .to(newsh2, { opacity: 1, y: 0, duration: .8 })
        .to(newsmore, { opacity: 1, y: 0, duration: .8 }, '-=80%')
        .to(newsswiper, { opacity: 1, y: 0, duration: .8 }, '-=80%');

    newsmotion.pause();

    ScrollTrigger.create({
        trigger: '.sc-news',
        start: 'top center+=20%',
        onEnter: function () {
            newsmotion.play();
        },
        onLeaveBack: function () {
            newsmotion.reverse();
        }
    });
    //푸터 스크롤업
    $('.scroll-up').click(function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' })
    })
})