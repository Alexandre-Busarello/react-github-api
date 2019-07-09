import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import { Container } from '../../components/Container';
import { Pagination, PaginationButton } from '../../components/Pagination';
import { Loading, Owner, IssueList, FilterIssue } from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    issueFilters: ['open', 'closed', 'all'],
    filter: 'open',
    page: 1,
    repository: {},
    issues: [],
    loading: true,
  };

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      this.getIssuesPromisse(repoName, 5, 'open', 1),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  handleFilter = async e => {
    this.setState({
      filter: e.target.value,
    });
    this.loadIssues();
  };

  handlePagination = async (_, type) => {
    const { page } = this.state;
    if (type === 'back') {
      this.setState({
        page: page > 1 ? page - 1 : 1,
      });
    }
    if (type === 'next') {
      this.setState({
        page: page + 1,
      });
    }
    this.loadIssues();
  };

  loadIssues = async () => {
    const { page, filter } = this.state;
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);

    this.setState({
      loading: true,
    });

    const filteredIssues = await this.getIssuesPromisse(
      repoName,
      5,
      filter,
      page
    );

    this.setState({
      issues: filteredIssues.data,
      loading: false,
    });
  };

  getIssuesPromisse = async (repoName, itemPerPage, statusName, page) => {
    return api.get(`/repos/${repoName}/issues`, {
      params: {
        state: statusName,
        per_page: itemPerPage,
        page,
      },
    });
  };

  render() {
    const {
      repository,
      issues,
      loading,
      issueFilters,
      filter,
      page,
    } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <FilterIssue>
          {issueFilters.map(filterName => (
            <div key={filterName}>
              <input
                type="checkbox"
                value={filterName}
                checked={filterName === filter}
                onChange={this.handleFilter}
              />
              <span>{filterName}</span>
            </div>
          ))}
        </FilterIssue>

        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                  <p>{issue.user.login}</p>
                </strong>
              </div>
            </li>
          ))}
        </IssueList>

        <Pagination>
          <>
            <PaginationButton
              onClick={e => this.handlePagination(e, 'back')}
              type="button"
              page={page}
            >
              {'< '}Anterior
            </PaginationButton>
            <PaginationButton
              onClick={e => this.handlePagination(e, 'next')}
              type="button"
            >
              Próximo{' >'}
            </PaginationButton>
          </>
        </Pagination>
      </Container>
    );
  }
}
