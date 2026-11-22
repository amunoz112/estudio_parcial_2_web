import { hash } from 'bcryptjs';

import dataSource from '../data-source.js';
import { User } from '../../users/entities/user.entity.js';
import { Role } from '../../users/entities/role.enum.js';

async function seed(): Promise<void> {
  await dataSource.initialize();

  try {
    const repository = dataSource.getRepository(User);

    const accounts = [
      {
        email: 'ana@unitickets.test',
        userName: 'Ana',
        role: Role.STUDENT,
      },
      {
        email: 'luis@unitickets.test',
        userName: 'Luis',
        role: Role.STUDENT,
      },
      {
        email: 'admin@unitickets.test',
        userName: 'Administrador',
        role: Role.ADMIN,
      },
    ];

    for (const account of accounts) {
      const existing = await repository.findOneBy({
        email: account.email,
      });

      if (existing) {
        console.log(`Ya existe: ${account.email}`);
        continue;
      }

      await repository.save(
        repository.create({
          ...account,
          password: await hash('Practica2026!', 10),
        }),
      );

      console.log(`Creado: ${account.email}`);
    }
  } finally {
    await dataSource.destroy();
  }
}

seed().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});