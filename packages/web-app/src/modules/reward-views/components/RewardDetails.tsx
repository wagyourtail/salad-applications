import React, { Component } from 'react'
import withStyles, { WithStyles } from 'react-jss'
import { SaladTheme } from '../../../SaladTheme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import classnames from 'classnames'
import { AngledPanel, AngleDirection } from '../../../components/AngledPanel'
import { Reward } from '../../reward/models/Reward'

const styles = (theme: SaladTheme) => ({
  container: {
    display: 'flex',
    position: 'relative',
    width: '790px',
  },
  lock: {
    position: 'absolute',
    right: '.5rem',
    top: '.5rem',
    cursor: 'pointer',
  },
  imageContainer: {
    height: '12rem',
    display: 'inline-block',
    width: '290px',
  },
  image: {
    height: '100%',
    width: 'auto',
  },
  rightContainer: {
    width: '37rem',
    padding: '.5rem',
    overflow: 'hidden',
    marginLeft: '.5rem',
    display: 'inline-flex',
    flexDirection: 'column',
    backgroundColor: theme.lightGreen,
    color: theme.blueFont,
  },
  nameText: {
    fontSize: theme.xLarge,
    fontFamily: 'SharpGroteskLight09',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginTop: '-.75rem',
    marginBottom: '-1rem',
  },
  details: {
    fontFamily: 'sharpGroteskBook19',
    fontSize: theme.small,
  },
  priceText: {
    fontSize: theme.medium,
    fontFamily: 'SharpGroteskLight25',
    whiteSpace: 'pre',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    border: `1px solid ${theme.blueFont}`,
    color: theme.blueFont,
    padding: '.25rem 1rem',
    margin: '0 .25rem',
    fontSize: theme.small,
    fontFamily: 'SharpGroteskLight25',
    textTransform: 'uppercase',
    cursor: 'pointer',
  },
})

interface Props extends WithStyles<typeof styles> {
  reward?: Reward
  onClickClose?: () => void
  onRedeem?: (rewardId: string) => void
  onSelect?: (rewardId: string) => Promise<void>
}

class _RewardDetails extends Component<Props> {
  timeRemainingText() {
    const { reward } = this.props

    if (reward === undefined) {
      return ''
    }

    if (reward.redeemable) {
      return '  |  Redeemable'
    }

    if (reward.remainingTimeLabel) {
      return `  |  ${reward.remainingTimeLabel}`
    }

    return ' '
  }

  handleClose = () => {
    const { onClickClose } = this.props

    if (onClickClose) {
      onClickClose()
    }
  }

  handleRedeem = () => {
    const { onRedeem, reward } = this.props

    if (onRedeem && reward) {
      onRedeem(reward.id)
    }
  }

  handleSelect = async () => {
    const { onSelect, onClickClose, reward } = this.props

    if (onSelect && reward) {
      await onSelect(reward.id)
    }

    if (onClickClose) {
      onClickClose()
    }
  }

  render() {
    const { reward, classes } = this.props

    return (
      <div className={classnames(classes.container, 'is-unselectable')}>
        {/* Image */}
        <AngledPanel
          style={{ backgroundColor: reward ? reward.color : 'white' }}
          className={classes.imageContainer}
          leftSide={AngleDirection.Right}
        >
          {reward && <img className={classes.image} src={reward.imageSrc} />}
        </AngledPanel>

        {/* Right side panel */}
        <div className={classnames(classes.rightContainer)}>
          <div style={{ flex: '1' }}>
            {/* Padlock */}
            <div className={classes.lock} onClick={this.handleClose}>
              <FontAwesomeIcon icon={faTimes} />
            </div>

            <div className={classnames(classes.priceText)}>
              {reward && `$${reward.price.toFixed(2)} ${this.timeRemainingText()}`}
            </div>
            <div className={classnames(classes.nameText)}>{reward ? reward.name : 'Unavailable'}</div>
            <div className={classnames(classes.details)}>{reward && reward.details}</div>
          </div>
          <div className={classes.buttonContainer}>
            {reward && reward.redeemable && (
              <div className={classes.button} onClick={this.handleRedeem}>
                Redeem
              </div>
            )}
            <div className={classes.button} onClick={this.handleSelect}>
              Select as reward
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export const RewardDetails = withStyles(styles)(_RewardDetails)