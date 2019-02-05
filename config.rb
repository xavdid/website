# configuration!

# Reload the browser automatically whenever files change
activate :livereload
activate :directory_indexes

set :css_dir, "css"
set :js_dir, "js"
set :images_dir, "img"
set :default_og_img, "https://i.imgur.com/zhqbTVt.png"

page "/*.txt", layout: false

Time.zone = "America/Los_Angeles"

# ignore 'README.md'

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  # Don't need to, using minified stuff already.
  # activate :minify_javascript

  # Enable cache buster
  activate :asset_hash

  # Use relative URLs
  activate :relative_assets
end

activate :deploy do |deploy|
  deploy.deploy_method = :git
  deploy.branch = "master"
end

activate :syntax
set :markdown_engine, :redcarpet

require "markdown_helper"
set :markdown, renderer: MarkdownHelper::MyRenderer,
               # these are all options passed to the redcarpet PARSER
               # options sent to the RENDERER (such as toc_data) go in the markdown_helper file
               fenced_code_blocks: true,
               footnotes: true,
               disable_indented_code_blocks: true,
               strikethrough: true,
               lax_spacing: true,
               tables: true

set :haml, ugly: true,
           format: :html5,
           remove_whitespace: false,
           hyphenate_data_attrs: false

activate :blog do |blog|
  blog.permalink = "/blog/{year}/{month}/{day}/{title}.html"
  blog.sources = "/posts/{year}-{month}-{day}-{title}.html"

  blog.tag_template = "tag.html"
  blog.taglink = "/blog/tag/{tag}.html"

  blog.layout = "blogpost"
  blog.default_extension = ".md"

  blog.new_article_template = File.expand_path("source/layouts/blank_post.erb", File.dirname(__FILE__))

  # Enable pagination
  blog.paginate = true
  blog.per_page = 5
  # for publishing same day? or maybe DST is messing with the hour
  # blog.publish_future_dated = true
end
