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

//_ OLSKDiskWrite

exports.OLSKDiskWrite = function(param1, param2) {
	if (typeof param1 !== 'string') {
		throw new Error('OLSKErrorInputNotValid');
	}

	if (typeof param2 !== 'string') {
		throw new Error('OLSKErrorInputNotValid');
	}

	exports.OLSKDiskCreateFolder(pathPackage.dirname(param1));

	fsPackage.writeFileSync(param1, param2);

	return param2;
};

//_ OLSKDiskRead

exports.OLSKDiskRead = function(inputData) {
	if (typeof inputData !== 'string') {
		throw new Error('OLSKErrorInputNotValid');
	}

	if (!exports.OLSKDiskIsRealFilePath(inputData)) {
		return null;
	}

	return fsPackage.readFileSync(inputData, 'utf8');
};

//_ OLSKDiskAppFolderName

exports.OLSKDiskAppFolderName = function() {
	return 'os-app';
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

	OLSKDiskStandardIgnoreItems () {
		return [
			'DS_Store',
			'node_modules',
			'vendor',
		]
	},

	OLSKDiskStandardIgnoreGlob () {
		return `**/+(.git|${ mod.OLSKDiskStandardIgnoreItems().join('|') }|__*)/**`;
	},

	OLSKDiskStandardIgnorePattern () {
		return new RegExp(`.*(\\.git|${ mod.OLSKDiskStandardIgnoreItems().join('|') }|__\\w+)/.*`, 'i')
	},

	OLSKDiskOpen (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('OLSKErrorInputNotValid');
		}

		const _mod = process.env.npm_lifecycle_script === 'olsk-spec' ? this : mod;

		_mod._DataFoilOpen(inputData);

		return inputData;
	},

	// DATA

	_DataFoilOpen: require('open'),

};

Object.assign(exports, mod);
