import '~mod/carousel-scroll-full-width-abtest';

import React from 'react';
import ReactDOM from 'react-dom';
import YotpoStar from '~comp/yotpo-star-abtest';

const yotpoStars = document.querySelectorAll('.react-yotpo-star-abtest');
yotpoStars.forEach((el) => {
	ReactDOM.render(
		React.createElement(YotpoStar, {
			productId: parseInt(el.dataset.productId, 10),
			productUrl: el.dataset.productUrl,
			showScore: el.dataset.showScore === 'true',
			showTotal: el.dataset.showTotal === 'true',
			hideStars: el.dataset.hideStars === 'true',
		}, null),
		el,
	);
});
