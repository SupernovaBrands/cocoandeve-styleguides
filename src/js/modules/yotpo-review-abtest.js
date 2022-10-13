import React from 'react';
import ReactDOM from 'react-dom';
import YotpoReviewTest from '~comp/yotpo-review-abtest';

const yotpoAbtestEl = document.querySelector('.react-yotpo-review--abtest');
ReactDOM.render(
	React.createElement(YotpoReviewTest, {
		productId: parseInt(yotpoAbtestEl.dataset.productId, 10),
		productName: yotpoAbtestEl.dataset.name || '',
		productUrl: yotpoAbtestEl.dataset.url || '',
		productImage: yotpoAbtestEl.dataset.imageUrl || '',
		productDesc: yotpoAbtestEl.dataset.description || '',
		canCreate: yotpoAbtestEl.dataset.canCreate === 'true',
		productSkus: yotpoAbtestEl.dataset.sku,
	}, null),
	yotpoAbtestEl,
);
