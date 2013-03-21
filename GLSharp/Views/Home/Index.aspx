<%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage" %>

<asp:Content ID="HeaderContent" ContentPlaceHolderID="HeaderContent" runat="server">
    <link href="/Content/Index.css" rel="stylesheet" type="text/css" />

    <script src="/Scripts/mscorlib.debug.js" type="text/javascript"></script>
    <script src="/Scripts/jquery-1.4.1.min.js" type="text/javascript"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js"></script>


    <script src="/Scripts/Box2dWeb-2.1.a.3.js" type="text/javascript"></script>
    <script src="/Scripts/Box2d.debug.js" type="text/javascript"></script>
    <script src="/Scripts/Environment.js" type="text/javascript"></script>
    <script src="/Scripts/Core.debug.js" type="text/javascript"></script>
    <script src="/Scripts/Engine.debug.js" type="text/javascript"></script>
    <script src="/Scripts/App.debug.js" type="text/javascript"></script>
    <script src="/Scripts/DemoGame.debug.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            var app = new App.App();

            app.init();

            $("#optionsButton").click(function () {
                if ($("#optionsContainer").css("display") == "none")
                    $("#optionsContainer").show("slide", null, 1000);
                else
                    $("#optionsContainer").hide("slide", null, 1000);

            });

            $("#depthFilter").change(function (value) {
                if ($("#depthFilter").attr("checked"))
                    app._engine._activeGame._depthEffect$1._active = true;
                else
                    app._engine._activeGame._depthEffect$1._active = false;
            });

            $("#ssaoFilter").change(function (value) {
                if ($("#ssaoFilter").attr("checked"))
                    app._engine._activeGame._ssaoEffect$1._active = true;
                else
                    app._engine._activeGame._ssaoEffect$1._active = false;
            });

            $("#motionFilter").change(function (value) {
                if ($("#motionFilter").attr("checked"))
                    app._engine._activeGame._motionEffect$1._active = true;
                else
                    app._engine._activeGame._motionEffect$1._active = false;
            });

            $("#bloomFilter").change(function (value) {
                if ($("#bloomFilter").attr("checked"))
                    app._engine._activeGame._bloomEffect$1._active = true;
                else
                    app._engine._activeGame._bloomEffect$1._active = false;
            });
        });

        
    </script>
</asp:Content>

<asp:Content ID="TitleConten" ContentPlaceHolderID="TitleContent" runat="server">
    Home
</asp:Content>

<asp:Content ID="MainContent" ContentPlaceHolderID="MainContent" runat="server">
    
    <div class="mainContainer">
        <canvas tabindex="1" id="mainCanvas" width="512" height="512"></canvas>
        
        <div class="options">
            <div class="optionsButton" id="optionsButton"></div>
            <div class="optionsContainer" id="optionsContainer">
                <div> <input type="checkbox" id="depthFilter" checked="checked"/> Depth filter </div>
                <div> <input type="checkbox" id="ssaoFilter" checked="checked"/> SSAO </div>
                <div> <input type="checkbox" id="motionFilter" checked="checked"/> Motion Blur </div>
                <div> <input type="checkbox" id="bloomFilter" checked="checked"/> Bloom </div>
            </div>
        </div>
        
    </div>
    
</asp:Content>
