package com.juaracoding.serviceapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.juaracoding.serviceapi.entity.Carts;

public interface CartsRepository extends CrudRepository<Carts, Long>{
	
	@Query(value="select * from carts as c where c.users_id =:userId", nativeQuery = true)
	List<Carts> findsByUserId(Long userId);
	
	@Query(value="delete from carts as c where c.users_id =:userId", nativeQuery = true)
	List<Carts> deleteByUserId(Long userId);
	
	@Query(value="Select COUNT(*) from carts where users_id =:userId", nativeQuery = true)
	public Long countCartUserId(@Param("userId") Long userId);

	@Query(value="SELECT SUM(price) from products inner join carts "
			+ "on products.id = carts.products_id "
			+ "where carts.users_id =:userId", nativeQuery = true)
	public Long SumCartUserId(@Param("userId") Long userId);

//	select count(distinct c.product_id) as qty from carts c where c.users_id=2
}
