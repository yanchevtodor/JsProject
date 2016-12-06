function getKinveyUserAuthHeaders() {
    return{
        Authorization: "Kinvey "+ sessionStorage.getItem("authToken")
    }
}

function listPosts() {
    $('#posts').empty();

    $.ajax({
        method:"GET",
        url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/Posts",
        headers: getKinveyUserAuthHeaders(),
        success: loadPostsSuccess,
        error: handleAjaxError
    });
    function loadPostsSuccess(posts) {

        let table =$(
            `<table>
                <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Actions</th>
                </tr>
           </table>`);

        for(let post of posts){
            let tr = $('<tr>');
            displayTableRow(tr, post);
            tr.appendTo(table);
        }

        $('#posts').append(table);
    }

    function displayTableRow(tr, post) {

        let links = [];
        if(post._acl.creator == sessionStorage.getItem('userId') ||  sessionStorage.getItem('userId') == "5842a705d23505ed75a249c9" ){

            let deleteLink = $("<a href='#'>[Delete]</a>").click(function () {
                deletePost(post._id)
            });
            let editLink = $("<a href='#'>[Edit]</a>").click(function () {
                loadEditPost(post._id);
                linkEditPost();
            });
            links.push(editLink);
            links.push(" ");
            links.push(deleteLink);
        }
        tr.append(
            $('<td>').text(post.Title),
            $('<td>').text(post.body),
            $("<td>").append(links)
        )
    }
}

function deletePost(postID) {
    $.ajax({
        method:"DELETE",
        url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/Posts/" + postID,
        headers: getKinveyUserAuthHeaders(),
        success: deletePostSuccess,
        error: handleAjaxError
    });

    function deletePostSuccess() {
        showInfo('Post deleted.');
        listPosts();
    }
}

function createPost() {

    let postData = {
        Title: $('#postTitle').val(),
        body: $('#postBody').val()
    };

    $.ajax({
        method:"POST",
        url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/Posts",
        headers: getKinveyUserAuthHeaders(),
        data: postData,
        success: createPostSuccess,
        error: handleAjaxError
    });

    function createPostSuccess() {
        showInfo('Post created.');
        linkViewPosts();
    }
}

function loadEditPost(postID) {
    $.ajax({
        method:"GET",
        url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/Posts/" + postID,
        headers: getKinveyUserAuthHeaders(),
        success: loadEditPostSuccess,
        error: handleAjaxError
    });

    function loadEditPostSuccess(post) {

        $('#formEditBook input[name=title]').val(post.Title);
        $('#formEditBook input[name=body]').val(post.body);
        $('#formEditBook input[name=id]').val(post._id);
    }
}

function editPost() {

    let postDataEdit = {
        Title:  $('#formEditBook input[name=title]').val(),
        body:  $('#formEditBook input[name=body]').val(),
        id: $('#formEditBook input[name=id]').val()
    };
    $.ajax({
        method:"PUT",
        url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/Posts/" + $('#formEditBook input[name=id]').val() ,
        headers: getKinveyUserAuthHeaders(),
        data: postDataEdit,
        success: editPostSuccess,
        error: handleAjaxError
    });

    function editPostSuccess() {
        showInfo('Post edited.');
        linkViewPosts()
    }
}