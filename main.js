const fsPackage = require('fs');
const pathPackage = require('path');

//_ OLSKDiskIsRealFolderPath

exports.OLSKDiskIsRealFolderPath = function(inputData) {
	if (!fsPackage.existsSync(inputData)) {
		return false;
	}

	return fsPackage.lstatSync(inputData).isDirectory();
};

//_ OLSKDiskIsRealFilePath

exports.OLSKDiskIsRealFilePath = function(inputData) {
	if (!fsPackage.existsSync(inputData)) {
		return false;
	}

	return fsPackage.lstatSync(inputData).isFile();
};

//_ OLSKDiskCreateFolder

exports.OLSKDiskCreateFolder = function(inputData) {
	if (typeof inputData !== 'string') {
		throw new Error('OLSKErrorInputNotValid');
	}

	if (exports.OLSKDiskIsRealFilePath(inputData)) {
		throw new Error('OLSKErrorInputNotValid');
	}

	if (!fsPackage.existsSync(inputData)) {
		fsPackage.mkdirSync(inputData, {
			recursive: true,
		});
	}

	return inputData;
};

//_ OLSKDiskDeleteFolder

exports.OLSKDiskDeleteFolder = function(inputData) {
	if (typeof inputData !== 'string') {
		throw new Error('OLSKErrorInputNotValid');
	}

	if (exports.OLSKDiskIsRealFolderPath(inputData)) {
		fsPackage.readdirSync(inputData).forEach(function(e) {
			if (exports.OLSKDiskIsRealFolderPath(pathPackage.join(inputData, e))) {
				return exports.OLSKDiskDeleteFolder(pathPackage.join(inputData, e));
			}

			fsPackage.unlinkSync(pathPackage.join(inputData, e));
		});

		fsPackage.rmdirSync(inputData);
	}

	return inputData;
};

//_ OLSKDiskWriteFile

exports.OLSKDiskWriteFile = function(param1, param2) {
	if (typeof param1 !== 'string') {
		throw new Error('OLSKErrorInputNotValid');
	}

	if (typeof param2 !== 'string') {
		throw new Error('OLSKErrorInputNotValid');
	}

	exports.OLSKDiskCreateFolder(pathPackage.dirname(param1));

	fsPackage.writeFileSync(param1, param2);

	return param1;
};

//_ OLSKDiskReadFile

exports.OLSKDiskReadFile = function(inputData) {
	if (typeof inputData !== 'string') {
		throw new Error('OLSKErrorInputNotValid');
	}

	if (!exports.OLSKDiskIsRealFilePath(inputData)) {
		throw new Error('OLSKErrorInputNotValid');
	}

	return fsPackage.readFileSync(inputData, 'utf8');
};

//_ OLSKDiskAppFolderName

exports.OLSKDiskAppFolderName = function() {
	return 'os-app';
};

//_ OLSKDiskPublicFolderName

exports.OLSKDiskPublicFolderName = function() {
	return 'os-public';
};

//_ OLSKDiskWorkspaceTestingFolderSubfolderNameFor

exports.OLSKDiskWorkspaceTestingFolderSubfolderNameFor = function(inputData) {
	if (typeof inputData !== 'string') {
		throw new Error('OLSKErrorInputNotValid');
	}

	if (inputData === '') {
		throw new Error('OLSKErrorInputNotValid');
	}

	return ['test', inputData].join('.').replace(/\./g, '-');
};

//_ OLSKDiskSafeBasenameFor

exports.OLSKDiskSafeBasenameFor = function(inputData) {
	if (typeof inputData !== 'string') {
		throw new Error('OLSKErrorInputNotValid');
	}

	return inputData.replace(/[\.,;:\*\?\|_<>\\\/\"\'\“\”\‘\’\«\»]/g, ' ').split(/\s/).filter(function(e) {
		return e.trim() !== '';
	}).join(' ');
};

const mod = {

	OLSKDiskStandardIgnorePattern () {
		return /.*(\.git|DS_Store|node_modules|vendor|__\w+)\/.*/i;
	},

};

Object.assign(exports, mod);
