import React, { Component } from 'react'
import ShelfTile from './ShelfTile';
import PropTypes from 'prop-types';


const shelfKindObj	= {
  BASE: 0,
  FOCUSED: 1,
  BLOOMED: 2
};

const initX         = 200;
const tileBaseWidth	= [320, 375, 782];                	//shelfTile: 320x180, 375x210, 782x440
// const tileBaseOffset= [0, 24, 58];                   	//offset between tiles adjacent
// const tileShiftX 	= [0, (375-320), (782-375)]			//as the selected tile (1st in the queue) blooms, the next tiles in the queue shift by tileShiftX
// const tileOffsetX   = tileBaseWidth[shelfKindObj.BASE] + tileBaseOffset[shelfKindObj.BASE];  //distance between the beginning of previous tile to the beginning of next tile
const maxTileIndex	= Math.floor(1920/320);				//stageWidth/tileBaseWidth

class HomeShelf extends Component {
	constructor(props) {
		super(props)
		this.state = {
			shelfKind: shelfKindObj.BASE,
			isSelected: false,
			//totalTiles: props.shows.length,
			tileQueue: []
		}
		this.totalTiles = props.shows.length
		this.eachShelfTile = this.eachShelfTile.bind(this)
	}

	componentWillMount() {
		this.topContainerStyle = {
			top: this.props.y + 'px'
		}
		//TODO: variable height

		//TODO: title style
		this.titleContainerStyle = {
			left: initX + 'px'
		}

		this.tileContainerStyle = {

		}
	}

    /* x again */
	eachShelfTile(tileObj, i) {
		//const totalTiles = this.props.shows.length
		const leftX = ( (i < maxTileIndex) || (i < (this.totalTiles - 1)) )? initX + tileBaseWidth[shelfKindObj.BASE]*i : initX - tileBaseWidth[shelfKindObj.BASE];
		return (
			<ShelfTile 	key={(i + 1).toString()}
				  		index={i}
				  		showTitle={tileObj.showTitle}
				  		episodeTitle={tileObj.episodeTitle}
				  		episodeID={tileObj.episode}
				  		imageURL={tileObj.imageURL}
				  		leftX={leftX} >
		    </ShelfTile>
		)
	}

	render() {
		return (
			<div className="HomeShelf" id={"homeShelfContainer" + this.props.index} style={this.topContainerStyle}>
				<div className="homeShelfTitleContainer" style={this.titleContainerStyle}>{this.props.title}</div>
				<div className="homeShelfTilesContainer" style={this.tileContainerStyle}>{this.props.shows.map(this.eachShelfTile)}</div>
			</div>
		)
	}
}

HomeShelf.propTypes = {
	title: PropTypes.string,
	index: PropTypes.number,
	id: PropTypes.string,
	title: PropTypes.string,
	shows: PropTypes.array,
	y: PropTypes.number
};

HomeShelf.defaultProps = {
  	title: "",
	index: 0,
	id: "HomeShelf0",
	title: "",
	shows: [],
	y: 62
};

export default HomeShelf
