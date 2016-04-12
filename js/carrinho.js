/**
 * Created by mfirm on 28/03/2016.
 */
var umaPropaganda = function () {
    var propagandas = ["O que acha de comprar uma motocicleta?",
                        "O que acha de comprar uma lancha?",
                        "O que acha de comprar uma bicicleta?",
                        "O uqe acha de comprar um carro?"];
    var posicao = Math.floor(propagandas.length * Math.random());
    var texto = propagandas[posicao];
    var trPropaganda = $("<tr>").addClass("propaganda").append($("<td>"));
    trPropaganda.find("td").attr("colspan", 6).text(texto);
    return trPropaganda;
};

var atualizaCarrinho = function () {
    var carrinho = $(this);
    var itens = carrinho.find(".item-total:visible");
    var total = 0;
    for(var i = 0; i < itens.length; i++) {
        var item = $(itens[i]);
        var valor = parseFloat(item.text());
        total = total + valor;
    }
    carrinho.find(".valor-total").text(total);
    carrinho.find(".quantidade-itens").text(itens.length);
};

var atualizaDados = function () {
    var carrinhos = $(".carrinho");
    carrinhos.each(atualizaCarrinho);
};

var desfazAcao = function () {
    var carrinho = $(this).closest(".carrinho");
    var trsVisiveis = carrinho.find("tr:visible");
    trsVisiveis.removeClass("recuperado");

    var trsHidden = carrinho.find("tr:hidden");
    trsHidden.addClass("recuperado");
    trsHidden.show();

    atualizaDados();
};

var removeItem = function (event) {
    event.preventDefault();

    var linkRemove = $(this);
    linkRemove.closest("tr").hide();

    atualizaDados();
};

var daDestaque = function () {
    $(this).find(".remove-item").fadeIn();
    $(this).addClass("hovering");
};

var tiraDestaque = function () {
    $(this).find(".remove-item").fadeOut();
    $(this).removeClass("hovering");
};

var alternaPropagandas = function (event) {
    event.preventDefault();
    $(".propaganda").fadeToggle();
    $(".alterna-propagandas").toggle();
};

var escondePropagandas = function (event) {
    event.preventDefault();
    $(".propaganda").fadeOut();
};

var exibePropagandas = function (event) {
    event.preventDefault();
    $(".propaganda").fadeIn();
};

var aposCarregarPagina = function(){
    atualizaDados();
    $(".undo").click(desfazAcao);
    $(".remove-item").click(removeItem);


    $(".carrinho").each(function () {
        $(this).find("tr:nth-child(3n),tr:last").each(function () {
            umaPropaganda().insertAfter($(this));
        });
    });

    $("tbody tr").hover(daDestaque, tiraDestaque);

    $("#esconde-propagandas").click(escondePropagandas);
    $("#exibe-propagandas").click(exibePropagandas);

    $(".alterna-propagandas").click(alternaPropagandas);
};

$(aposCarregarPagina);
