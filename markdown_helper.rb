# https://aalvarez.me/posts/custom-markdown-in-middleman/

module MarkdownHelper

  require 'middleman-core/renderers/redcarpet'

  class JRenderer < Middleman::Renderers::MiddlemanRedcarpetHTML
    def initialize(options={})
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
  end

end
