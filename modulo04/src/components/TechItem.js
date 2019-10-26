import React from 'react';
import PropTypes from 'prop-types';

//function TechItem(props) {
// props.tech
//ou por desustruturacao
//function TechItem({ tech, onDelete }) {



function TechItem({ tech, onDelete }) {

  return (
    <li>
      {tech}
      <button onClick={onDelete} type="button">Remover</button>
    </li>
  )
}

/**
 *
 * Default Props para componentes de funcao
 */
// TechItem.defaultProps = {
//   tech: 'Oculto'
// }

/**
 * Definicao de proptypes
 */
TechItem.propTypes = {
  tech: PropTypes.string,
  onDelete: PropTypes.func.isRequired
}


export default TechItem
