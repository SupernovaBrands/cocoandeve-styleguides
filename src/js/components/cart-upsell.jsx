import React from 'react';
import PropTypes from 'prop-types';

import { formatMoney } from '~mod/utils';

const CartUpsell = (props) => {
	const { upsell, onAddUpsell } = props;
	const { settings = {} } = upsell;
	return (
		<div className="mt-2">
			<div className="upsell d-flex align-items-center border">
				<figure className="row mb-0 w-100">
					<picture className="col-4">
						<img
							className="lazyload w-100"
							alt={upsell.productTitle}
							src={settings.bundle_front_image_200}
							data-src={settings.bundle_front_image}
							data-sizes="auto"
							data-widths="[370,270]"
						/>
					</picture>
					<figcaption className="col-8 d-flex flex-column mx-0">
						<h4 className="font-weight-bold"><a href={upsell.url}>{settings.bundle_ad_product_name}</a></h4>
						<p dangerouslySetInnerHTML={{ __html: settings.bundle_ad_product_desc }} />
						{upsell.comparePrice > 0 && (
							<p className="text-linethrough font-weight-bold mb-0">{formatMoney(upsell.comparePrice)}</p>
						)}
						<p className="text-primary font-weight-bold">{formatMoney(upsell.price)}</p>
						<button className="btn btn-outline-primary align-self-start" onClick={() => { onAddUpsell(upsell); }} type="button">{settings.bundle_txt_button}</button>
					</figcaption>
				</figure>
			</div>
		</div>
	);
};

CartUpsell.propTypes = {
	upsell: PropTypes.object.isRequired,
	onAddUpsell: PropTypes.func.isRequired,
};

export default CartUpsell;
