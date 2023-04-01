import { DataTypes, Model, Sequelize } from 'sequelize';
import { AirDrop } from './airdrop';
export class Project extends Model {
  public name!: string;
  public link!: string;
  public status!: string;
}

export function initializeProject (sequelize : Sequelize) {
	Project.init(
		{
			name: {
				type: DataTypes.STRING(32),
				primaryKey: true,
			},
			link: {
				type: DataTypes.STRING(256),
			},
			status: {
				type: DataTypes.STRING(16),
			},
		},
		{
			tableName: 'project',
			sequelize,
			timestamps : false
		}
	);      
}

export function airDropAssociatedProject() {
	Project.belongsTo(AirDrop, {
		foreignKey : "project",
		as : "projects"
	})
}