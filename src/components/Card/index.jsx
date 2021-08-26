import PropTypes from 'prop-types'
import { Component } from 'react'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import DefaultPicture from '../../assets/profile.png'

const CardLabel = styled.span`
  color: #5843e4;
  font-size: 22px;
  font-weight: normal;
  padding-left: 15px;
`

const CardTitle = styled.span`
  color: black;
  font-size: 22px;
  font-weight: normal;
  align-self: center;
`

const CardImage = styled.img`
  height: 150px;
  width: 150px;
  align-self: center;
  border-radius: 50%;
`

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 15px;
  background-color: ${colors.backgroundLight};
  border-radius: 30px;
  width: 300px;
  height: 300px;
  transition: 200ms;
  &:hover {
    cursor: pointer;
    box-shadow: 2px 2px 10px #e2e3e9;
  }
`

class Card extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isFavorite: false,
    }
  }

  setFavorite = () => {
    this.setState({ isFavorite: !this.state.isFavorite })
  }

  render() {
    const { theme, picture, label, title } = this.props
    const { isFavorite } = this.state
    const star = isFavorite ? '⭐️' : ''

    return (
      <CardWrapper theme={theme} onClick={this.setFavorite}>
        <CardLabel theme={theme}>{label}</CardLabel>
        <CardImage src={picture} alt="freelance" />
        <CardTitle theme={theme}>
          {star} {title} {star}
        </CardTitle>
      </CardWrapper>
    )
  }
}

Card.propTypes = {
    label: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    theme: PropTypes.string.isRequired,
}

Card.defaultProps = {
    label: '',
    title: '',
    picture: DefaultPicture,
    theme: 'light',
}

export default Card