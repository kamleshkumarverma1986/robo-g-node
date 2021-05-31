/**
 * Created by kaverma on 6/4/16.
 */

const db_machine = 'localhost';
const db_username = 'kamlesh';
const db_password = 'kamlesh123';
const db_port = 27017;
const db_name = 'kamleshonetwo';

module.exports = {
    db: {
		production: `mongodb://${db_username}:${db_password}@${db_machine}:${db_port}/${db_name}`,
		development: `mongodb://${db_machine}:${db_port}/${db_name}`,
		test: `mongodb://${db_username}:${db_password}@${db_machine}:${db_port}/${db_name}`
    }
};


