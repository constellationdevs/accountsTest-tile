ons.disableAutoStyling();
setTimeout(function () {
    container.tile.ui.showBody();

}, 500);

var tile = {
    data: {},
    str: [],
    getNav: function () {
        return document.getElementById('navigator');
    },
    popPanel: function () {
        consolelog('popPanel');
        tile.getNav().popPage();

    },
    resetStack: function () {
        tile.getNav().resetPage();
    },
    renderAccountLists: function (deposits, loans) {
        // LOAD TILE STRINGS
        container.tile.data.loadStrings(function () {
            tile.str = container.strings

            // BUILD DEPOSIT LIST
            var depositList = tile.buildList(tile.str["100515"], deposits);

            // BUILD LOAN LIST
            var loanList = tile.buildList(tile.str["100516"], loans);

            // RENDER BOTH LISTS TO DOM
            $("#accounts-list-container").append(depositList, loanList)
        })
    },
    buildList: function (header, accounts) {
        // CREATE LIST AND APPEND HEADER
        var list = $("<ons-list>");
        var listHeader = $("<ons-list-header>").text(header)
        list.append(listHeader);

        // ADD A LIST ITEM FOR EACH ACCOUNT, WITH CLICK HANDLER FOR DISPLAYING DATA
        accounts.forEach(function (account) {
            var listItem = $("<ons-list-item>").attr("modifier", "chevron").click(function () {
                container.tile.navigation.pushPanelWithTitle(tile.getNav(), "account-data.html", tile.str["100514"]);

                // TIMEOUT TO HANDLE ASYNC
                setTimeout(function () {
                    // RENDER FORMATTED JSON TO DOM
                    jsonView.format(account, "#account-data-container")
                }, 250)
            })

            // CREATE LIST ITEM CONTENT AND ADD TO THIS ITEM
            var accountIdLabel = "<b>AccountId:&nbsp;</b>"
            var typeLabel = "&nbsp;&nbsp;&nbsp;<b>Type:&nbsp;</b>"
            var descriptionLabel = "&nbsp;&nbsp;&nbsp;<b>Description:&nbsp;</b>"
            var listItemDetails = accountIdLabel 
            + account.accountId 
            + typeLabel 
            + account.type
            + descriptionLabel
            + account.description
            var leftDiv = $("<div>").attr("class", "left").html(listItemDetails)
            listItem.append(leftDiv);
            list.append(listItem);
        })
        // RETURN FINAL RESULT
        return list;
    }
}

ons.ready(function () {
    $(document).ready(function () {

        container.tile.ui.showSpinner("Getting accounts...")
        // LOAD ACCOUNTS
        container.core.getAccounts(function (res) {
            consolelog(res);
            container.tile.ui.hideSpinner();

            // IF ACCOUNTS RECEIVED
            if (res.success) {
                // RENDER ACCOUNTS LIST
                tile.renderAccountLists(res.data.depositAccountDetails.depositMessage.depositList.deposit, res.data.loanAccountDetails.loanMessage.loanList.loan);
                // IF ACCOUNT RETRIEVAL FAILED
            } else {
                // DISPLAY ERROR TOAST
                ons.notification.toast("An error has ocurred, check the console for details.", { timeout: 3000, animation: "ascend" });
            }

        })
    })
})
