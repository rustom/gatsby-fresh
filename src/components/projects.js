import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import Icon from '@components/icons';
import { IconContext } from '@meronex/icons';

const ProjectsStyle = styled.div`
  text-align: center;
  // display: flex;
  // flex-direction: column;
  // align-items: center;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 15px;
  margin: auto;

  // margin-left: auto;
  // margin-right: auto;
  // margin-bottom: 50px;
`;

const ProjectItem = styled.div`
  // margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  // width: 80%;
  // border: 2px solid var(--accent-1-dark-color);
  box-shadow: 0px 0px 25px 5px #000000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default function Projects() {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "content/projects/" }
          frontmatter: { showInProjects: { ne: false } }
        }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              tech
              github
              external
            }
            html
          }
        }
      }
    }
  `);

  return (
    <ProjectsStyle>
      <IconContext.Provider value={{ size: '35px' }}>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <ProjectItem key={node.id}>
          <p>
            {node.frontmatter.title} <span> {node.frontmatter.date}</span>
          </p>
          {node.frontmatter.github && (
            <a
              href={node.frontmatter.github}
              aria-label="Link to GitHub repo"
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="GitHub" />
            </a>
          )}
          {node.frontmatter.external && (
            <a
              href={node.frontmatter.external}
              aria-label="Link to GitHub repo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="Link" />
            </a>
          )}

          {/* <div dangerouslySetInnerHTML={{ __html: node.html }} /> */}
        </ProjectItem>
      ))}
      </IconContext.Provider>
    </ProjectsStyle>
  );
}
