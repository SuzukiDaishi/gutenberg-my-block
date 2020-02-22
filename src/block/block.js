
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload } = wp.editor;
const { Button } = wp.components;

registerBlockType( 'cgb/block-my-block', {
	title: __( 'my-block - CGB Block' ),
	icon: 'shield',
	category: 'common',
	keywords: [
		__( 'my-block — CGB Block' ),
		__( 'CGB Example' ),
		__( 'create-guten-block' ),
	],
	attributes: {
		cardTitle: {
			type: 'string',
			default: '商品タイトル',
		},
		cardContent: {
			type: 'string',
			default: '商品の内容を書いてね！',
		},
		mediaID: {
			type: 'number',
		},
		mediaURL: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src',
		},
	},
	state: {
		count: 0,
	},
	edit: ( { className, attributes, setAttributes } ) => {
		return (
			<div className={ className }>
				<div className="card">

					<div className="image">
						<MediaUpload
							onSelect={ media => setAttributes( { mediaURL: media.url, mediaID: media.id } ) }
							type="image"
							value={ attributes.mediaID }
							render={ ( { open } ) => (
								<Button onClick={ open }>
									{
										! attributes.mediaID ? <img className="card-img" src="https://placehold.jp/1334x750.png?text=画像をアップロード" alt=""></img> : <img className="card-img" src={ attributes.mediaURL } alt=""></img>
									}
								</Button>
							) }
						/>
					</div>

					<div className="card-content">
						<RichText
							tagName="h5"
							className="card-title"
							value={ attributes.cardTitle }
							onChange={ content => setAttributes( { cardTitle: content } ) }
						/>
						<RichText
							tagName="div"
							className="card-text"
							value={ attributes.cardContent }
							onChange={ content => setAttributes( { cardContent: content } ) }
						/>
					</div>
					<div className="card-link">
						<button className="card-button" onClick="">
							カートに入れる
						</button>
					</div>
				</div>
			</div>
		);
	},
	save: ( { className, attributes } ) => {
		return (
			<div className={ className }>
				<div className="card">
					<div className="card-content">
						{ attributes.mediaURL && (
							<img className="card-img" src={ attributes.mediaURL } alt=""></img>
						) }
						<RichText.Content
							tagName="h5"
							className="card-title"
							value={ attributes.cardTitle }
						/>
						<RichText.Content
							tagName="div"
							className="card-text"
							value={ attributes.cardContent }
						/>
					</div>
					<div className="card-link">
						<button
							className="card-button">
							カートに入れる
						</button>
					</div>
				</div>
			</div>
		);
	},
} );
