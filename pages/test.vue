<template>
	<div>
		<div class="icon">
			<div class="icon-mouth"></div>
		</div>
		<!-- <div>{{ getUniqueNumber(items) }}</div>
		<div class="w-50 aab" v-for="item in 20">item</div> -->
	</div>
</template>
<script setup>
	import { ref } from 'vue';

	const testese = ref();
	const user = [
		{ firstName: 'John', lastName: 'Doe', customerID: 10, profession: 'student' },
		{ firstName: 'Alice', lastName: 'Amith', customerID: 11, profession: 'freelancer' },
		{ firstName: 'Dlice', lastName: 'Cmith', customerID: 14, profession: 'productOwner' },
		{ firstName: 'Elice', lastName: 'Dmith', customerID: 15, profession: 'engineer' },
		{ firstName: 'Flice', lastName: 'Emith', customerID: 16, profession: 'systemAnalytics' },
		{ firstName: 'Blice', lastName: 'Smith', customerID: 12, profession: 'freelancer' },
		{ firstName: 'Clice', lastName: 'Bmith', customerID: 13, profession: 'productOwner' },
	];
	let items = [1, 1, 1, 5, 2, 3, 4, 3, 3, 3, 3, 3, 3, 7, 8, 5, 4, 9, 0, 1, 3, 2, 6, 7, 5, 4, 4, 7, 8, 8, 0, 1, 2, 3, 1];

	// 将数组转换为Set，从而去除重复项
	function getUniqueNumber(items) {
		let uniqueItems = new Set(items);
		let uniqueItemsArray = Array.from(uniqueItems);
		return uniqueItemsArray;
	}

	// 再将Set转换回数组

	function sortUserName(user) {
		const arr = user.map((e) => {
			return `${e.firstName}${e.lastName}${e.customerID}`;
		});
		return arr.sort();
	}
	// sortUserName(user);

	function sortByType(user) {
		// 設定排序
		const sortProfession = {
			systemAnalytics: 5,
			engineer: 4,
			productOwner: 3,
			freelancer: 2,
			student: 1,
		};

		const arr = user.sort((a, b) => {
			const PA = sortProfession[a.profession];
			const PB = sortProfession[b.profession];
			return PB - PA;
		});
		return arr;
	}
	sortByType(user);
</script>
<style scoped lang="scss">
	* {
		box-sizing: border-box;
	}
	.icon {
		color: #272727;
		width: 56px;
		height: 50px;
		background-color: currentColor;
		border-radius: 36px 25px 31px 0px;
		position: relative;
		&::before {
			content: '';
			position: absolute;
			top: 9px;
			left: -1px;
			width: 57px;
			height: 32px;
			background-color: white;
			border-radius: 70% 40% 50% 0%;
		}
		&::after {
			content: '';
			right: 14px;
			top: 19px;
			position: absolute;
			width: 13px;
			height: 13px;
			background-color: currentColor;
			border-radius: 50%;
		}

		.icon-mouth {
			top: 15px;
			left: 52px;
			width: 18px;
			height: 10px;
			position: absolute;
			background-color: currentColor;
			border-radius: 0% 95% 0% 0%;
			transform: rotate(-10deg);
			&::before {
				content: '';
				position: absolute;
				top: 0px;
				left: -9px;
				width: 10px;
				height: 10px;
				border-radius: 0 50% 50% 0;
				background-color: white;
			}
		}
	}

	.aab {
		background-color: antiquewhite;
		&:nth-child(even) {
			background-color: blueviolet;
		}
	}

	.container .shop-list li.item:nth-child(even) {
		background-color: blue;
	}
</style>
