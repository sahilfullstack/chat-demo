const tsc = require('typescript');
const babelJest = require('babel-jest');
const tsConfig = require('../../tsconfig.json');

module.exports = {
    process(src, path) {
        const isTs = path.endsWith('.ts');
        const isJs = path.endsWith('.js');
        const isTsx = path.endsWith('.tsx');

        if (isTs || isTsx || isJs) {
            src = tsc.transpileModule(
                src,
                {
                    compilerOptions: tsConfig.compilerOptions,
                    fileName: path
                }
            );
            src = src.outputText;

            // update the path so babel can try and process the output
          //  path = path.substr(0, path.lastIndexOf('.')) + (isTs ? '.js' : '.jsx') || path;
        }

        //if (path.endsWith('.js') || path.endsWith('.jsx')) {
        //    src = babelJest.process(src, path);
        //}
        return src;
    },
};