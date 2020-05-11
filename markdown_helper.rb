# https://aalvarez.me/posts/custom-markdown-in-middleman/

module MarkdownHelper
  require "middleman-core/renderers/redcarpet"

  class MyRenderer < Middleman::Renderers::MiddlemanRedcarpetHTML
    def initialize(options = {with_toc_data: true})
      super
    end

    def table(header, body)
      %(
        <div class="table-container">
          <table>
            <thead>#{header}</thead>
            <tbody>#{body}</tbody>
          </table>
        </div>
      )
    end

    def link(link, title, content)
      if link && link.include?("http")
        # external link!
        %(<a href="#{link}" target="_blank" rel="nofollow">#{content}</a>)
      else
        # internal link
        %(<a href="#{link}">#{content}</a>)
      end
    end

    def image(link, title, alt_text)
      %(<div class="imgbox">#{super}</div>)
    end
  end
end
