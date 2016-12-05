function startApp(){

    sessionStorage.clear();
    showHideMenuLinks();
    $("main").load("templates/home.html");

    $("#loadingBox").hide();
    $("#infoBox").hide();
    $("#errorBox").hide();

    $("#linkHome").click(linkHome);
    $("#linkLogin").click(linkLogin);
    $("#linkLogout").click(linkLogout);
    $("#linkRegister").click(linkRegister);
    $("#linkCreatePost").click(linkCreatePost);
    $("#linkViewPosts").click(linkViewPosts);

    $("#infoBox, #errorBox").click(function() {
        $(this).fadeOut();
    });

    $(document).on({
        ajaxStart: function() { $("#loadingBox").show() },
        ajaxStop: function() { $("#loadingBox").hide() }
    });



}

