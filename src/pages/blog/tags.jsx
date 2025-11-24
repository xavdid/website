import { graphql, useStaticQuery } from "gatsby";
import React from "react";

import Link from "../../components/Link";
import PageHeader from "../../components/page-header";
import Seo from "../../components/seo";

import Layout from "../../components/layouts/BaseLayout";

import { slugify } from "../../misc/utils";

const tagsPage = () => {
  const {
    allMdx: { tags },
  } = useStaticQuery(graphql`
    {
      allMdx(filter: { fields: { published: { eq: true } } }) {
        tags: group(field: frontmatter___tags) {
          tag: fieldValue
          num: totalCount
        }
      }
    }
  `);

  tags.forEach((t) => {
    t.slug = slugify(t.tag);
  });
  tags.sort((a, b) => {
    if (b.num !== a.num) {
      return b.num - a.num;
    }
    // https://stackoverflow.com/questions/8996963/how-to-perform-case-insensitive-sorting-array-of-string-in-javascript#comment38960219_9645447
    return a.tag.localeCompare(b.tag, "en", { sensitivity: "base" });
  });

  // used for configuring the sorting, ignored for now
  // const [byAlpha, setByAlpha] = useState(true);
  // useEffect(() => {
  //   if (byAlpha) {
  //     tags.sort((a, b) => {
  //       return a.tag.toLowerCase() < b.tag.toLowerCase();
  //     });
  //   } else {
  //     tags.sort((a, b) => b.num - a.num);
  //   }
  // }, [byAlpha]);

  return (
    <Layout>
      <Seo title="Posts by Tag" path="/tags/" />

      <PageHeader title="Tags" />
      <p>I've written on {tags.length} different topics.</p>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Tag</th>
              <th>Link</th>
              <th># posts</th>
            </tr>
          </thead>
          <tbody>
            {tags.map(({ tag, slug, num }) => (
              <tr key={tag}>
                <td>{tag}</td>
                <td>
                  <Link href={`/blog/tags/${slug}`}>see posts</Link>
                </td>
                <td> {num}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default tagsPage;
