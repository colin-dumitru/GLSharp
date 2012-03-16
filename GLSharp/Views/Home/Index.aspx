<%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage" %>

<asp:Content ID="HeaderContent" ContentPlaceHolderID="HeaderContent" runat="server">
    <script src="/Scripts/mscorlib.debug.js" type="text/javascript"></script>
    <script src="/Scripts/jquery-1.4.1.min.js" type="text/javascript"></script>

    <script src="/Scripts/Environment.js" type="text/javascript"></script>
    <script src="/Scripts/Core.debug.js" type="text/javascript"></script>
    <script src="/Scripts/Engine.debug.js" type="text/javascript"></script>
    <script src="/Scripts/App.debug.js" type="text/javascript"></script>
    <script src="/Scripts/DemoGame.debug.js" type="text/javascript"></script>
    <script type="text/javascript"">
        $(document).ready(function () {
            var app = new App.App();

            app.init();

        });
    </script>
</asp:Content>

<asp:Content ID="TitleConten" ContentPlaceHolderID="TitleContent" runat="server">
    Home Page
</asp:Content>

<asp:Content ID="MainContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><%: ViewData["Message"] %></h2>
    <p>
        <canvas id="mainCanvas" width="800" height="600"></canvas>
    </p>
</asp:Content>
