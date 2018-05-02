# configuration!

# Reload the browser automatically whenever files change
activate :livereload
activate :directory_indexes

set :css_dir, 'css'
set :js_dir, 'js'
set :images_dir, 'img'
set :default_og_img, 'https://i.imgur.com/zhqbTVt.png'

page '/*.txt', layout: false

Time.zone = 'America/Los_Angeles'

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

  config[:https_redirect] = true
end

activate :deploy do |deploy|
  deploy.deploy_method = :git
  deploy.branch   = 'master'
end

activate :syntax
set :markdown,  fenced_code_blocks:           true,
                footnotes:                    true,
                disable_indented_code_blocks: false,
                autolink:                     true,
                strikethrough:                true,
                tables:                       true,
                with_toc_data:                true

set :markdown_engine, :redcarpet

set :haml, ugly:                 true,
           format:               :html5,
           remove_whitespace:    false,
           hyphenate_data_attrs: false

activate :blog do |blog|
  blog.permalink = '/blog/{year}/{month}/{day}/{title}.html'
  blog.sources = '/posts/{year}-{month}-{day}-{title}.html'

  blog.tag_template = 'tag.html'

  blog.layout = 'blogpost'
  blog.default_extension = '.md'

  blog.new_article_template = File.expand_path('source/layouts/blank_post.erb', File.dirname(__FILE__))

  # Enable pagination
  blog.paginate = true
  blog.per_page = 5
end
