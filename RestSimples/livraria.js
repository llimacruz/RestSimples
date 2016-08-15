function toggleListaEdit() {
    if ($("#divEdit").css('display') == 'none')
    {
        $("#divEdit").show();
        $("#lista").hide();
        $("#boxLista").hide();
    }
    else
    {
        $("#divEdit").hide();
        $("#lista").show();
        $("#boxLista").show();
    }
}

function cancelar() {
    toggleListaEdit();
}

function getLivros() {
    $.ajax({
        type: "GET",
        url: "api/livros",
    }).success(function (data) {
        $("#lista").empty();
        $.each(data, function (a, b) {
            var editar = "<a href='#' onclick='editar(" + b.Id + ")'>Editar</a>";
            var excluir = "<a href='#' onclick='excluir(" + b.Id + ")'>Excluir</a>";
            $("#lista").append("<div>" + editar + " | " +  excluir + " | " + b.Id + " - " + b.Nome + "</div>");
        });
    });
}

function editar(id) {
    toggleListaEdit();

    $.ajax({
        type: "GET",
        url: "api/livros/" + id,
    }).success(function (data) {
        $("#txtId").val(id);
        $("#txtId").prop('disabled', true);
        $("#txtNome").val(data.Nome);
        $("#txtAutor").val(data.Autor);
        $("#txtPaginas").val(data.Paginas);
    });
}

function novoLivro() {
    toggleListaEdit();

    $("#txtId").val('');
    $("#txtId").prop('disabled', false);
    $("#txtNome").val('');
    $("#txtAutor").val('');
    $("#txtPaginas").val('');
}

function gravar() {
    var id = $("#txtId").val();
    var nome = $("#txtNome").val();
    var autor = $("#txtAutor").val();
    var paginas = $("#txtPaginas").val();

    var livro = { Id: id, Nome: nome, Autor: autor, Paginas: paginas };

    var type = ($("#txtId").prop("disabled")) ? "PUT" : "POST";
    $.ajax({
        type: type,
        data: JSON.stringify(livro),
        url: "api/livros",
        contentType: "application/json",
        dataType: "json"
    }).success(function (res) {
        //alert("gravado!");
    });
    getLivros();
    toggleListaEdit();
}

function excluir(id) {
    $.ajax({
        type: "DELETE",
        url: "api/livros/" + id
    }).success(function (res) {
        //alert("excluído!");
    });
    getLivros();
}



