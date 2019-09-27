<div class="plugins">
  <div id="searchbox"></div>
  <div id="stats"></div>
  <div id="results"></div>
  <script type="text/template" id="template-item">
    <div class="plugin">
      <div class="plugin--left">
        <div class="plugin--title">
          <a href="<%= it.url %>" class="plugin--name"><%= it.name %></a>
          <a class="plugin--author" href="<%= it.authorUrl %>">
              <img width="20" height="20" class="plugin--avatar" src="<%= it.authorAvatar %>">
              <%= it.authorName %>
          </a>
          <span class="plugin--version"><%= it.version %></span>
        </div>
        <div class="plugin--description"><%= it.description %></div>
      </div>
      <div class="plugin--right"->
        <div class="plugin--downloads"><%= it.downloadReadable %></div>
        <div class="plugin--date"><%= it.lastUpdated %></div>
      </div>
    </div>
  </script>
</div>