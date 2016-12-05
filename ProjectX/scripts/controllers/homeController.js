function linkHome() {
    $("main").load("templates/home.html")
}
function linkLogin() {
    $("main").load("templates/login.html")
}
function linkLogout() {
    logoutUser();
    $("main").load("templates/home.html")
}
function linkRegister() {
    $("main").load("templates/register.html")
}
function linkCreatePost() {
    $("main").load("templates/createPost.html")
}
function linkViewPosts() {
    $("main").load("templates/posts.html");

}
function viewProfile() {
    $("main").load("templates/profile.html");
}

function showHideMenuLinks() {
    $("#linkHome").show();
    if (sessionStorage.getItem('authToken')) {
        // We have logged in user
        $("#linkLogin").hide();
        $("#linkRegister").hide();
        $("#linkViewPosts").show();
        $("#linkCreatePost").show();
        $("#linkLogout").show();
    } else {
        // No logged in user
        $("#linkLogin").show();
        $("#linkRegister").show();
        $("#linkViewPosts").hide();
        $("#linkCreatePost").hide();
        $("#linkLogout").hide();
    }
}
