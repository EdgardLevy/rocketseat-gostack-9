import React, { Component } from 'react';

import TechItem from '../components/TechItem';

/**
 * Criacao do componente extendendo a classe Component do react
 * todo componente que eh feito com classe precisa obrigatoriamente
 * ter o metodo render e dentro dele o return com o jsx que sera utilizado
 */
class TechList extends Component {

  /**
   * static propTypes = {
   * }
   */

  /**
   * Default props para componentes de classe
   *
   * static defaultProps = {
   *   tech:'Oculto'
   * }
   *
   */

  state = {
    newTech: '',
    techs: []
  };

  //executado assim que o componente aparece em tela
  componentDidMount() {
    const techs = localStorage.getItem('techs');
    if (techs) {
      this.setState({ techs: JSON.parse(techs) })
    }
  }
  //executado sempre que houver alteracao nas props ou estado
  //prevProps e prevState sao os valores anteriores das props e do state
  //componentDidUpdate(prevProps, prevState) {
  componentDidUpdate(_, prevState) {

    if (prevState.techs !== this.state.techs) {
      localStorage.setItem('techs', JSON.stringify(this.state.techs))
    }
    //this.props
    //this.state

  }
  //executado quando o componente deixa de existir
  componentWillUnmount() {
    //serve pra limpar qualquer tipo de sujeira que pode existir
  }

  /**
   * Toda funcao propria utilizada no componente
   * tem que ser criada no formato de arrow function
   * para seja possivel ter acesso a variavel this
   */
  handleInputChange = e => {
    //console.log(e.target.value)
    /**
     * no react existe o conceito de imutabilidade, ou seja, nao eh possivel
     * alterar diretamente o state, ex
     * this.state.newTech = e.target.value
     *
     * para alterar o state eh preciso utilizar o metodo setState
     */

    this.setState({ newTech: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault();
    //console.log(this.state.newTech);
    /**
     * No codigo abaixo, eh feito uma copia do itens
     * de techs e adicionado no final da lista o valor
     * de newTech
     */
    this.setState({
      techs: [...this.state.techs, this.state.newTech],
      newTech: ''
    })
  }

  handleDelete = (tech) => {
    console.log(tech)
    this.setState({
      techs: this.state.techs.filter(t => t !== tech)
    })
  }

  render() {
    /**
     * Toda vez que há uma iteração em uma lista eh preciso passar
     * a prop key com um valor unico da lista, como por exemplo o id
     * no caso acima, os nomes da lista nao se repetem
     *
     * O react nao permite adicionar dois elementos
     * para tratar como um elemento soh, basta abrir as tags <></>
     *  esse 'elemento' eh chamado de 'fragment'
     */
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <h1>{this.state.newTech}</h1>
          <ul>
            {this.state.techs.map(tech => (
              <TechItem
                key={tech}
                tech={tech}
                onDelete={() => this.handleDelete(tech)} />))}
          </ul >
          <input
            type="text"
            onChange={this.handleInputChange}
            value={this.state.newTech} />
          <button type="submit">Enviar</button>
        </form>
      </>
    )
  }
}

export default TechList;
