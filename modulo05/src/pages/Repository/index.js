import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Loading, Owner, IssueList } from './styles';
import api from '../../services/api';
import Container from '../../components/Container';

// dentro da propriedade match tem os parametros da rotas
export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
  };

  async componentDidMount() {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);

    // carrega os dados do repositorio e os issues
    // atraves de duas promises asyncronas
    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);

    console.log(repository);
    console.log(issues);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
    console.log(match);
  }

  render() {
    const { repository, issues, loading } = this.state;
    // console.log(repoName);
    if (loading) {
      return <Loading>Carregando...</Loading>;
    }
    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  {/** utiliza o a href pq eu um link externo */}
                  <a href={issue.html_url}>{issue.title}</a>
                  {/** LABLES */
                  issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                  <p>{issue.user.login}</p>
                </strong>
              </div>
            </li>
          ))}
        </IssueList>
      </Container>
    );
  }
}
// export default function Repository({ match }) {
//   return <h1>Repository :{decodeURIComponent(match.params.repository)}</h1>;
// }
